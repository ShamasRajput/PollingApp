import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Input, List, Space, Popconfirm, message, Upload, Image } from 'antd';
import { pollService } from '../../services';

export default function Dashboard() {
  const [polls, setPolls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPoll, setEditPoll] = useState(null);
  const [form] = Form.useForm();

  const fetchPolls = async () => {
    const response = await pollService.fetch();
    if (response?.success) {
      setPolls(response.data);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.question);

      const options = values.options
        .split(',')
        .map(opt => opt.trim());

      formData.append("options", JSON.stringify(options));

      if (values.image && values.image.file) {
        formData.append("image", values.image.fileList[0].originFileObj);
      }

      let response;

      if (editPoll) {
        response = await pollService.update(editPoll._id, formData);
        message.success("Poll updated successfully");
      } else {
        response = await pollService.add(formData);
        message.success("Poll created successfully");
      }

      if (response?.success) {
        fetchPolls();
        setIsModalOpen(false);
        form.resetFields();
        setEditPoll(null);
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  };

  const handleEdit = (poll) => {
    setEditPoll(poll);
    form.setFieldsValue({
      question: poll.name,
      options: poll.options.map(o => o.text).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const res = await pollService.delete(id);
    if (res?.success) {
      message.success("Poll deleted successfully");
      fetchPolls();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Polls Dashboard</h1>
        <Button type="primary" onClick={() => {
          setIsModalOpen(true);
          setEditPoll(null);
          form.resetFields();
        }}>
          Create New Poll
        </Button>

        <List
          itemLayout="vertical"
          style={{ marginTop: 6 }}
          dataSource={polls}
          renderItem={(poll) => (
            <Card
              key={poll._id}
              title={poll.name}
              style={{ marginBottom: 6 }}
              extra={
                <Space>
                  <Button size="small" onClick={() => handleEdit(poll)}>Edit</Button>
                  <Popconfirm title="Delete this poll?" onConfirm={() => handleDelete(poll._id)}>
                    <Button size="small" danger>Delete</Button>
                  </Popconfirm>
                </Space>
              }
            >
              <div className="flex gap-4">
                {poll.image && (
                  <div className="flex-shrink-0 w-18 h-18 overflow-hidden rounded border border-gray-200">
                    <Image
                      src={poll.image}
                      alt="Poll"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-grow">
                  <ul className="list-disc pl-4">
                    {poll.options.map((opt, idx) => (
                      <li key={idx}>
                        {opt.text} — {opt.votes} vote{opt.votes !== 1 ? 's' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

          )}
        />

        <Modal
          title={editPoll ? "Edit Poll" : "Create Poll"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setEditPoll(null);
            form.resetFields();
          }}
          onOk={() => form.submit()}
          okText={editPoll ? "Update" : "Create"}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
            <Form.Item name="question" label="Question" rules={[{ required: true }]}>
              <Input placeholder="Enter poll question" />
            </Form.Item>
            <Form.Item name="options" label="Options (comma separated)" rules={[{ required: true }]}>
              <Input placeholder="e.g. Apple, Banana, Mango" />
            </Form.Item>
            <Form.Item name="image" label="Upload Image">
              <Upload
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button>Select Image</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
