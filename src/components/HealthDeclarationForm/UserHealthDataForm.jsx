// import { useState } from 'react'
import './UserHealthDataForm.css'
import {
    Form,
    Button,
    Input, InputNumber,
    Checkbox,
    Select,
    Divider
} from 'antd'
import SymptonsCheckboxGroup from './SymptonsCheckboxGroup'


const { Option } = Select
const { Item: FormItem } = Form

const phonePrefix = (
    <Form.Item name="phonePrefix" noStyle initialValue="+65">
      <Select
        style={{
          width: 80,
        }}
      >
        <Option value="+60">+60</Option>
        <Option value="+61">+61</Option>
        <Option value="+63">+63</Option>
        <Option value="+65">+65</Option>
        <Option value="+224">+224</Option>
        <Option value="+299">+299</Option>
        <Option value="+245">+245</Option>
      </Select>
    </Form.Item>
);

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};


const UserHealthDataForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values from form: ', values);
    };

    return (
        <div className='healthDataFormMain'>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <FormItem 
                    name="fullname"
                    label="Full Name"
                    // rules={[
                    //     {
                    //     required: true,
                    //     message: 'Please enter your name!',
                    //     },
                    // ]}
                >
                    <Input placeholder="Alice Tan" allowClear={true}/>
                </FormItem>
                <FormItem 
                    name="nric"
                    label="NRIC/FIN"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please enter your NRIC/FIN!',
                    //     },
                    //     {
                    //         validator: (_, value) => {
                    //             return value.length === 9 ? Promise.resolve(): Promise.reject(new Error('Invalid format for NRIC/FIN'))
                    //         }
                    //     }
                    // ]}
                >
                    <Input placeholder="S1234567M" allowClear={true} maxLength={9}/>
                </FormItem>
                <FormItem name="phone" label="Phone">
                    <Input placeholder="8888 9999" addonBefore={phonePrefix} allowClear/>
                </FormItem>

                {/* ------------------------------------------------------------------ */}
                <Divider orientation="left">Health Details</Divider>
                

                <FormItem name="temperature" label="Temperature">
                    <InputNumber placeholder={36.7} addonAfter="°C"/>
                </FormItem>

                {/* Symptons */}
                <FormItem 
                    name="symptons" 
                    label="Symptons"
                    rules={[
                        {
                            validator: (_, value) => {
                                console.log('symptons', value)
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <SymptonsCheckboxGroup />
                </FormItem>


                {/* ------------------------------------------------------------------ */}
                <FormItem name="contactWithin14Days" label="Contact Within 14 Days" valuePropName="checked">
                    <Checkbox style={{ display: 'flex', justifyContent: 'flex-start' }}/>
                </FormItem>


                {/* ------------------------------------------------------------------ */}
                {/* Submit button */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserHealthDataForm