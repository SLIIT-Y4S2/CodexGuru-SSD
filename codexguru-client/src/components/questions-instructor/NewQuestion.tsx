/**
 * NewQuestion implementation
 */
"use client";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";

export default function NewQuestion() {
  const [form] = Form.useForm();

  return (
    <center
      style={{
        marginTop: "50px",
      }}
    >
      <Form
        onFinish={() => {
          console.log("Hello");
        }}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Question ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    required
                    label="Question"
                    name={[field.name, "name"]}
                  >
                    <Input />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Options">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Input
                                  readOnly
                                  placeholder="(a)"
                                  style={{ width: "40px" }}
                                />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "second"]}
                              >
                                <Input placeholder="Option 1" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Input
                                  readOnly
                                  placeholder="(a)"
                                  style={{ width: "40px" }}
                                />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "second"]}
                              >
                                <Input placeholder="Option 1" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                            
                          ))}
                          {/* <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Option
                          </Button> */}
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Question
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
        <br />

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </center>
  );
}
