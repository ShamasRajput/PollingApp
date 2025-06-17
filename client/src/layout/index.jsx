import { Layout, theme } from 'antd';
import HeaderLayout from './HeaderLayout';

const { Content } = Layout;
export default function MainLayout({ children }) {

  const { token: { borderRadiusLG } } = theme.useToken();

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Layout>
        <HeaderLayout />
        <Content
          style={{ overflow: 'initial' }} >
          <div
            className="min-h-screen"
            // style={{
            //   backgroundColor: "#FFFFFF",
            // }}
          >
            {children}
          </div>

        </Content>
      </Layout>
    </Layout>
  );
}
