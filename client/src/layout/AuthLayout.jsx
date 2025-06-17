import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default function AuthLayout({ children }) {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout" >
                <Content>
                        {children}
                </Content>
            </Layout>
        </Layout>
    )
}