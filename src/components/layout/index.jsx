import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

const index = () => {
    const location = useLocation();
    // const propsData = location.state;
    // console.log('layout: ', location);
    // const navigate = useNavigate();

    // return (
    //     location.pathname.includes('/pages/create') 
    //     ? 
    //         <Layout className="h-screen overflow-y-hidden">
                // <div style={{margin: "20px", display:'absolute'}}>
                //     <Space direction="vertical">
                //         <Space wrap>
                //             <Tooltip title="search">
                //                 <Button onClick={() => navigate(-1)} type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
                //             </Tooltip>
                //         </Space>
                //     </Space>
                // </div>
    //             <Content />
    //         </Layout>
    //     :
    //         <Layout className="h-screen overflow-y-hidden">
    //             <Sidebar />
    //             <Content />
    //         </Layout>
    // );
    const blackList = ["pages/create", "/pages/update", "/post/update"];
    // console.log('00: ', !blackList.some((item) => item.startsWith(location.pathname)))
    return (
      <Layout className="h-screen overflow-y-hidden">
        {!blackList.some((item) => item.startsWith(location.pathname)) ? null : (
          <Sidebar />
        )}
        <Content />
      </Layout>
    );
};
  


export default index;
