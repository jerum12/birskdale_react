import React, { Fragment,useEffect,useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Divider } from 'antd';
const { Option } = Select;


function EditDetailsDrawer({visible,onClose, stock}) {

      const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

    return (
        <Fragment>
            <Drawer
            title="Edit Details"
            width={680}
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            // footer={
            //     <div
            //       style={{
            //         textAlign: 'right',
            //       }}
            //     >
            //       <Button
            //         onClick={onClose}
            //         style={{ marginRight: 8 }}
            //       >
            //         Cancel
            //       </Button>
            //       <Button type="primary">
            //         Submit
            //       </Button>
            //     </div>
            //   }
            >
             <Form
                name="basic"
                initialValues={{
                  stock_no: stock.stock_no,
                  leather_type : stock.leather_type,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                
                >
                <Row gutter={16}>
                  
                    <Col span={12}>
                        <Form.Item
                            name="stock_no"
                            label="Stock Number"
                            rules={[
                                { required: true, 
                                  message: 'Please enter stock number' 
                                }
                            ]}
                            >
                            <Input placeholder="Please enter stock number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select a leather type"
                          allowClear
                          showSearch
                        >
                          <Option value="leather_a">male</Option>
                          <Option value="leather_b">female</Option>
                          <Option value="leather_c">other</Option>
                        </Select>
                      </Form.Item>
                    </Col>       
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            
            </Drawer>
        </Fragment>
    )
}

export default EditDetailsDrawer
