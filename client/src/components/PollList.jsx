import { useState } from 'react';

const polls = [
  {
    id: 1,
    question: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'C++', 'Java']
  },
  {
    id: 2,
    question: 'What framework do you prefer?',
    options: ['React', 'Vue', 'Angular', 'Svelte']
  }
];

export default function PollList() {
  const [votes, setVotes] = useState({});

  const handleVote = (pollId, option) => {
    setVotes({ ...votes, [pollId]: option });
  };

  return (
    <div className="space-y-6">
      {polls.map(poll => (
        <div key={poll.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">{poll.question}</h3>
          <div className="space-y-2">
            {poll.options.map(option => (
              <button
                key={option}
                onClick={() => handleVote(poll.id, option)}
                className={`block w-full px-4 py-2 text-left border rounded ${
                  votes[poll.id] === option ? 'bg-green-200' : 'bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
