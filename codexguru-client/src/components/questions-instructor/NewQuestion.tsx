/**
 * NewQuestion implementation
 */
"use client";
import React, { useContext, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
import { validateQuesForm } from "@/app/utils/OnlineExamUtil";
import { ExamsContext } from "@/app/context/ExamsContext";

export default function NewQuestion() {
  const [form] = Form.useForm();

  const { addQuestions } = useContext(ExamsContext);

  return (
    <Form
      onFinish={function () {
        if (validateQuesForm(form.getFieldsValue())) {
          addQuestions(
            window.location.pathname.split("/")[3],
            form.getFieldsValue()
          );
        } else {
          alert("Please add at least one option");
        }
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
                  label="Question"
                  name={[field.name, "name"]}
                  required
                >
                  <Input required />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="Option(s)">
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
                            <Form.Item noStyle name={[subField.name, "option"]}>
                              <Input placeholder="Answer" required />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[subField.name, "correctness"]}
                            >
                              {/* <Select
                                onChange={}
                                style={{ width: 120 }}
                                options={[
                                  { value: true, label: "Correct" },
                                  { value: false, label: "Incorrect" },
                                ]}
                              /> */}

                              <select required>
                                <option value="">None</option>
                                <option value={true}>Correct</option>
                                <option value={false}>Incorrect</option>
                              </select>
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Option
                        </Button>
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

      <Button type="primary" htmlType="submit">
        SUBMIT
      </Button>
    </Form>
  );
}
