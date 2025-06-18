const Poll = require("../models/pollModel");

// Helper to format image path with full URL
const formatPoll = (poll, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return {
        ...poll._doc,
        image: poll.image ? `${baseUrl}/${poll.image.replace(/\\/g, '/')}` : null
    };
};

exports.createPoll = async (req, res) => {
    try {
        const { name } = req.body;

        const options = Array.isArray(req.body.options)
            ? req.body.options.map(opt => ({ text: opt }))
            : JSON.parse(req.body.options).map(opt => ({ text: opt }));

        const image = req.file ? req.file.path : null;

        const poll = await Poll.create({
            name,
            options,
            image,
            user: req.user.userId,
        });

        res.status(201).json({ success: true, data: formatPoll(poll, req) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMyPolls = async (req, res) => {
    try {
        const polls = await Poll.find({ user: req.user.userId });
        const formattedPolls = polls.map(p => formatPoll(p, req));
        res.json({ success: true, data: formattedPolls });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        const formattedPolls = polls.map(p => formatPoll(p, req));
        res.json({ success: true, data: formattedPolls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: "Poll not found" });
        res.json({ success: true, data: formatPoll(poll, req) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updatePoll = async (req, res) => {
    try {
        const { name } = req.body;

        const options = Array.isArray(req.body.options)
            ? req.body.options.map(opt => ({ text: opt }))
            : JSON.parse(req.body.options).map(opt => ({ text: opt }));

        const image = req.file ? req.file.path : undefined;

        const updatedPoll = await Poll.findByIdAndUpdate(
            req.params.id,
            {
                name,
                options,
                ...(image && { image }),
            },
            { new: true }
        );

        if (!updatedPoll) {
            return res.status(404).json({ success: false, message: "Poll not found" });
        }

        res.json({ success: true, data: formatPoll(updatedPoll, req) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.deletePoll = async (req, res) => {
    try {
        await Poll.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Poll deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.voteOnPoll = async (req, res) => {
    try {
        const { optionId } = req.body;
        const pollId = req.params.id;
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!optionId) {
            return res.status(400).json({ success: false, message: 'optionId is required.' });
        }

        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ success: false, message: 'Poll not found.' });
        }

        // Check for duplicate vote by IP
        const hasVoted = poll.voters.some(voter => voter.ip === ip);
        if (hasVoted) {
            return res.status(400).json({ success: false, message: 'You have already voted on this poll.' });
        }

        // Find option
        const option = poll.options.find(opt => opt.id.toString() === optionId);
        if (!option) {
            return res.status(400).json({ success: false, message: 'Option not found.' });
        }

        // Add vote
        const currentVotes = parseFloat(option.votes.toString());
        option.votes = (currentVotes + 1).toString();

        // Track voter IP
        poll.voters.push({ ip, optionId });

        await poll.save();

        res.json({ success: true, message: 'Vote recorded.', data: poll });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



