import React, { Component } from 'react'
import { Row, Col, Popover, Tooltip, message } from 'antd'
import {
  LinkedinOutlined,
  GithubOutlined,
  PhoneOutlined,
  MailOutlined,
  CopyOutlined
} from '@ant-design/icons'
import './CustomFooter.css'

export default class CustomFooter extends Component {
  render() {
    return (
      <Row gutter={[16, 16]} justify="center"
        className="footer-row"
      >
        <Col span={2} xs={4}>
          <Tooltip title="Check out my LinkedIn profile">
            <a 
              target="_blank" 
              href="https://www.linkedin.com/in/minmarnoo/"
              rel="noreferrer"
              className="social-media-link"
            >
              <LinkedinOutlined />
            </a>
          </Tooltip>
        </Col>
        <Col span={2} xs={4}>
          <Tooltip title="Check out my GitHub profile">
            <a 
              target="_blank" 
              href="https://github.com/pohti?tab=repositories"
              rel="noreferrer"
              className="social-media-link"
            >
              <GithubOutlined />
            </a>
          </Tooltip>
        </Col>
        <Col span={2} xs={4}>
          <Popover
            content={(
              <div className="footer-popover-content">
                <span>+65 8815 6448</span> {" "}
                <CopyTextButton text="+65 8815 6448"/>
              </div>
            )}
            title={null}
          >
            <PhoneOutlined className="contact-popover-icon social-media-link"/>
            
          </Popover>
        </Col>
        <Col span={2} xs={4}>
          <Popover
            content={(
              <div className="footer-popover-content">
                <span>minmarnoo@gmail.com</span> {" "}
                <CopyTextButton text="minmarnoo@gmail.com"/>
              </div>
            )}
            title={null}
          >
            <MailOutlined className="contact-popover-icon social-media-link"/>
          </Popover>
        </Col>
      </Row>
    )
  }
}

const CopyTextButton = ({text}) => {
  const copyTextToClipBoard = () => {
    navigator.clipboard.writeText(text)
    message.success("Copied to clipboard!")
  }
  return (
    <button onClick={copyTextToClipBoard}
      className="copy-button"
    >
      <CopyOutlined />
    </button>
  )
}
