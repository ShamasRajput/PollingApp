import PollList from '../components/PollList';

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Polls</h2>
      <PollList />
    </div>
  );
}
