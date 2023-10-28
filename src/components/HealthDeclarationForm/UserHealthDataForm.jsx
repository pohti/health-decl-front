import { useState } from 'react'
import './UserHealthDataForm.css'
import {
    Form,
    Button,
    Input, InputNumber,
    Checkbox,
    Select,
    Divider,
    notification,
    Tooltip
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import SymptonsCheckboxGroup from './SymptonsCheckboxGroup'
import { addUserHealthInfo } from '../../api/api'

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

const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 16,
    },
};

const parseSymptons = symptons => {

    let output = {}
    for (let sympton of symptons) {
        output[`${sympton}`] = true
    }
    return output
}

const UserHealthDataForm = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification(); 

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
          message,
          description
        });
      };

    const onFinish = async (values) => {
        console.log('Received values from form: ', values);
        const {
            fullname, nric, phone, phonePrefix,
            contactWithin14Days,
            symptons,
            temperature
        } = values
        let userData = {
            fullname,
            nric,
            phone: `${phonePrefix} ${phone}`,
            healthDetails: {
                temperature,
                contactWithin14Days
            }
        }
        if (symptons) userData.healthDetails.symptons = parseSymptons(symptons)
        console.log('userData to be submitted', userData)

        try {
            setIsLoading(true)
            const response = await addUserHealthInfo(userData)
            console.log('submission response', response)

            openNotificationWithIcon('success', 'Done!','Health declaration submitted successfully')
            form.resetFields();
        } catch (eInfo) {
            console.error(eInfo)
            openNotificationWithIcon('error', 'Failed!','Please try again!')
        } finally {
            setIsLoading(false)
        }
    };

    const handleReset = () => {
        form.resetFields();
    }

    return (

        <div className='healthDataFormMain'>
            {contextHolder}
            <Form
                disabled={isLoading}
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
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name!',
                        },
                    ]}
                >
                    <Input placeholder="Alice Tan" allowClear={true}/>
                </FormItem>
                <FormItem 
                    name="nric"
                    label="NRIC/FIN"
                    rules={[
                        {
                            validator: (_, value) => {
                                return value.length === 9 ? Promise.resolve(): Promise.reject(new Error('Invalid format for NRIC/FIN'))
                            }
                        }
                    ]}
                >
                    <Input placeholder="S1234567M" allowClear={true} maxLength={9}/>
                </FormItem>
                <FormItem name="phone" label="Phone">
                    <Input placeholder="8888 9999" addonBefore={phonePrefix} allowClear/>
                </FormItem>

                {/* ------------------------------------------------------------------ */}
                <Divider orientation="left">Health Details</Divider>
                

                <FormItem name="temperature" label="Temperature"
                    rules={[
                        {
                            validator: (_, value) => {
                                const isValidTemp = value >= 25 && value <= 50
                                return isValidTemp ? Promise.resolve(): Promise.reject(new Error('Invalid format for temperature'))
                            }
                        }
                    ]}
                >
                    <InputNumber placeholder={36.7} addonAfter="°C" size="middle" />
                </FormItem>

                {/* Symptons */}
                <FormItem 
                    name="symptons" 
                    label={<span>
                        Symptons {" "}
                        <Tooltip title="Leave the checkboxes unchecked if you do not have any symptons">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>}
                >
                    <SymptonsCheckboxGroup />
                </FormItem>


                {/* ------------------------------------------------------------------ */}
                <FormItem name="contactWithin14Days" label="Contact Within 14 Days" valuePropName="checked">
                    <Checkbox style={{ display: 'flex', justifyContent: 'flex-start' }}/>
                </FormItem>


                {/* ------------------------------------------------------------------ */}
                {/* Buttons */}
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={isLoading}>
                        Submit
                    </Button>
                    <Button loading={isLoading} onClick={handleReset} style={{ marginLeft: '10px' }} >
                        Reset
                    </Button>
                </Form.Item>


            </Form>
        </div>
    )
}

export default UserHealthDataForm