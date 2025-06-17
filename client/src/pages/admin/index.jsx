// pages/Dashboard.js
import { useState } from 'react';
import { Card, Button, Modal, Form, Input, List, Space, Popconfirm, message } from 'antd';

export default function Dashboard() {
  const [polls, setPolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPoll, setEditPoll] = useState(null);

  const [form] = Form.useForm();

  const handleCreateOrUpdate = (values) => {
    if (editPoll) {
      // Update existing poll
      setPolls(prev =>
        prev.map(p => (p.id === editPoll.id ? { ...p, ...values } : p))
      );
      message.success('Poll updated successfully');
    } else {
      // Create new poll
      const newPoll = {
        id: Date.now(),
        ...values,
        options: values.options.split(',').map(opt => opt.trim())
      };
      setPolls(prev => [...prev, newPoll]);
      message.success('Poll created successfully');
    }
    form.resetFields();
    setEditPoll(null);
    setIsModalOpen(false);
  };

  const handleEdit = (poll) => {
    setEditPoll(poll);
    form.setFieldsValue({
      question: poll.question,
      options: poll.options.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPolls(prev => prev.filter(p => p.id !== id));
    message.success('Poll deleted');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Polls Dashboard</h1>
        <Button type="primary" onClick={() => { setIsModalOpen(true); setEditPoll(null); form.resetFields(); }}>
          Create New Poll
        </Button>

        <List
          itemLayout="vertical"
          className="mt-6"
          dataSource={polls}
          renderItem={(poll) => (
            <Card
              key={poll.id}
              title={poll.question}
              className="mb-4"
              extra={
                <Space>
                  <Button size="small" onClick={() => handleEdit(poll)}>Edit</Button>
                  <Popconfirm title="Delete this poll?" onConfirm={() => handleDelete(poll.id)}>
                    <Button size="small" danger>Delete</Button>
                  </Popconfirm>
                </Space>
              }
            >
              <ul className="list-disc pl-6">
                {poll.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </Card>
          )}
        />

        <Modal
          title={editPoll ? "Edit Poll" : "Create Poll"}
          open={isModalOpen}
          onCancel={() => { setIsModalOpen(false); setEditPoll(null); }}
          onOk={() => form.submit()}
          okText={editPoll ? "Update" : "Create"}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
            <Form.Item name="question" label="Question" rules={[{ required: true }]}>
              <Input placeholder="Enter poll question" />
            </Form.Item>
            <Form.Item name="options" label="Options (comma separated)" rules={[{ required: true }]}>
              <Input placeholder="e.g. Option A, Option B, Option C" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
