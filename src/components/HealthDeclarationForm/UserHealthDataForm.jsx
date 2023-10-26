import { useState } from 'react'
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
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+60</Option>
        <Option value="86">+65</Option>
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
    const [hasSymptons, setHasSymptons] = useState(false)

    return (
        <div className='healthDataFormMain'>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
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
                            required: true,
                            message: 'Please enter your NRIC/FIN!',
                        },
                        {
                            validator: (_, value) => {
                                console.log('nric', value)
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
                

                <FormItem name="temperature" label="Temperature">
                    <InputNumber placeholder={36.7} addonAfter="°C"/>
                </FormItem>

                {/* Symptons */}
                <FormItem name="symptons" label="Symptons">
                    <SymptonsCheckboxGroup />
                </FormItem>


                {/* ------------------------------------------------------------------ */}
                <FormItem name="contactWithin14Days" label="Contact Within 14 Days">
                    <Checkbox style={{ display: 'flex', justifyContent: 'flex-start' }} />
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