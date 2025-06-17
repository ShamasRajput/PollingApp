import { useState } from 'react';
import { Button, Card } from 'antd'

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
    <div className="flex flex-row gap-6">
      {polls.map((poll, index) => (
        <Card key={poll.id} className="border p-4 w-1/2 rounded shadow " title={`Poll ${index + 1}`} >
          <h3 className="text-lg font-semibold mb-2">{poll.question}</h3>
          <div className="space-y-2">
            {poll.options.map(option => (
              <Button
                key={option}
                onClick={() => handleVote(poll.id, option)}
                block
                style={{
                  backgroundColor: votes[poll.id] === option ? '#bbf7d0' : '#f3f4f6', 
                  borderColor: votes[poll.id] === option ? '#86efac' : '#d1d5db',
                  color: 'black',
                  textAlign: 'left'
                }}
              >
                <span className='w-full block text-left'>{option}</span>
              </Button>

            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
