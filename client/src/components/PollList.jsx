import { useEffect, useState } from 'react';
import { Button, Card, Image, message } from 'antd'
import { pollService } from '../services';


export default function PollList() {
  const [polls, setPolls] = useState([])
  const [votes, setVotes] = useState({});

  const initialize = async () => {
    const response = await pollService.fetchAll();
    if (response?.success ?? false) {
      setPolls(response.data)
    }
  }

  const handleVote = async (pollId, optionId) => {
    try {
      const response = await pollService.vote(pollId, optionId);
      if (response?.success) {
        // Mark this option as voted for this poll
        setVotes(prev => ({ ...prev, [pollId]: optionId }));
        message.success("Vote Casted")

        // Optional: Refresh polls to get updated vote counts
        initialize();
      } else {
        console.error('Voting failed:', response?.message);
      }
    } catch (err) {
      console.error('Error voting:', err.message);
    }
  };


  useEffect(() => {
    initialize();
  }, []);


  return (
    <div className="flex flex-wrap gap-6 p-6">
      {polls.map((poll, index) => (
        <Card
          key={poll._id}
          className="border p-4 w-full md:w-[48%] rounded shadow"
          title={`Poll ${index + 1}: ${poll.name}`}
        >
          <div className="flex gap-4">
            {poll.image && (
              <div className="flex-shrink-0 w-40 h-40 overflow-hidden rounded border border-gray-200">
                <Image
                  src={poll.image}
                  alt="Poll"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-grow space-y-2">
              {poll.options.map(option => (
                <Button
                  key={option._id}
                  onClick={() => handleVote(poll._id, option._id)}
                  block
                  style={{
                    backgroundColor: votes[poll._id] === option._id ? '#bbf7d0' : '#f3f4f6',
                    borderColor: votes[poll._id] === option._id ? '#86efac' : '#d1d5db',
                    color: 'black',
                    textAlign: 'left',
                    marginBottom: 10,
                  }}
                >
                  <span className="w-full block text-left">
                    {option.text} — {option.votes} vote{option.votes !== 1 ? 's' : ''}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

}
