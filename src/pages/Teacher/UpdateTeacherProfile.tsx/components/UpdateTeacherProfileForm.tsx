import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  Button,
  Card,
  Space,
  Divider,
  Upload,
  type FormInstance,
} from "antd";
import {
  SaveOutlined,
  UserOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  IdcardOutlined,
  UploadOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
  DeleteOutlined,
  BookOutlined,
} from "@ant-design/icons";

import {
  COUNTRY_OPTIONS,
  getCityOptions,
  getAreaOptions,
  CATEGORY_OPTIONS,
  getCourseOptions,
  getSubjectOptions,
} from "../../../../utils/formOptions.utils";

const { TextArea } = Input;
const { Option } = Select;

import type { TTeacher } from "../../../../types/teacher.types";

interface UpdateTeacherProfileFormProps {
  initialData: TTeacher | undefined;
  onFinish: (values: any) => void;
  isLoading: boolean;
  form: FormInstance;
  onCancel: () => void;
}

const UpdateTeacherProfileForm: React.FC<UpdateTeacherProfileFormProps> = ({
  onFinish,
  isLoading,
  form,
  onCancel,
}) => {
  const values = Form.useWatch([], form);
  const selectedCountry = values?.preferred_teaching_locations?.country;
  const selectedCity = values?.preferred_teaching_locations?.city;
  const selectedCategories = values?.preferred_tutoring?.categories ?? [];
  const selectedCourses = values?.preferred_tutoring?.courses ?? [];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark="optional"
      autoComplete="off"
    >
      <Space orientation="vertical" size={24} className="w-full">
        {/* =========================================================================
            SECTION 1: Overview & Personal Details
            ========================================================================= */}
        <Card
          title={
            <>
              <UserOutlined className="text-blue-600 mr-2" /> Personal & Core
              Details
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name="full_name"
              label="Full Name"
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="Enter teacher name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Primary Contact Number"
              rules={[{ required: true, message: "Primary phone is required" }]}
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>

            <Form.Item
              name="additional_phone"
              label="Additional Contact Number"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>

            <Form.Item name="date_of_birth" label="Date of Birth">
              <DatePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="gender" label="Gender">
              <Radio.Group className="w-full flex gap-3 pt-1">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="religion"
              label="Religion"
              rules={[
                { required: true, message: "Please select your religion" },
              ]}
            >
              <Select placeholder="Select a religion">
                <Option value="christianity">Christianity</Option>
                <Option value="islam">Islam</Option>
                <Option value="hinduism">Hinduism</Option>
                <Option value="buddhism">Buddhism</Option>
              </Select>
            </Form.Item>

            <Form.Item name="blood_group" label="Blood Group">
              <Select
                placeholder="Select Blood Group"
                allowClear
                className="w-full"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <Option key={bg} value={bg}>
                      {bg}
                    </Option>
                  ),
                )}
              </Select>
            </Form.Item>

            <Form.Item name="marital_status" label="Marital Status">
              <Radio.Group className="pt-1">
                <Radio value="unmarried">Unmarried</Radio>
                <Radio value="married">Married</Radio>
              </Radio.Group>
            </Form.Item>

            <div className="col-span-1 @sm:col-span-2 @lg:col-span-3">
              <Form.Item name="about_me" label="About Me (Bio Profile Summary)">
                <TextArea
                  rows={3}
                  placeholder="Describe your pedagogical approach and teaching strengths..."
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </div>
          </div>

          <Divider
            orientation="horizontal"
            className="m-0 mb-4 text-xs font-medium text-gray-400 uppercase tracking-wider"
            titlePlacement="start"
          >
            Address Information
          </Divider>
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-4 gap-y-1">
            <Form.Item name="present_address" label="Present Address">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="Current residential location details..."
              />
            </Form.Item>
            <Form.Item name="permanent_address" label="Permanent Address">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="Permanent family domicile details..."
              />
            </Form.Item>
          </div>
        </Card>

        {/* =========================================================================
            SECTION 2: Tutoring Preferences
            ========================================================================= */}
        <Card
          title={
            <>
              <EnvironmentOutlined className="text-emerald-600 mr-2" />
              Tutoring Preferences
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          <div className="grid grid-cols-1 @sm:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item name="years_of_experience" label="Years of Experience">
              <InputNumber
                min={0}
                max={50}
                className="w-full!"
                placeholder="0"
              />
            </Form.Item>
            <Form.Item
              name={["preferred_tutoring", "salary_range", "min"]}
              label="Min Target Monthly Salary"
            >
              <InputNumber
                min={0}
                className="w-full!"
                placeholder="e.g. 4000"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
            <Form.Item
              name={["preferred_tutoring", "salary_range", "max"]}
              label="Max Target Monthly Salary"
            >
              <InputNumber
                min={0}
                className="w-full!"
                placeholder="e.g. 15000"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-x-4 gap-y-1">
            {/* Categories */}
            <Form.Item
              name={["preferred_tutoring", "categories"]}
              label="Preferred Categories"
            >
              <Select
                mode="multiple"
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Select Categories"
                className="w-full"
                options={CATEGORY_OPTIONS}
                allowClear
                onChange={() => {
                  // Reset dependent fields when categories change
                  form.setFieldValue(["preferred_tutoring", "courses"], []);
                  form.setFieldValue(["preferred_tutoring", "subjects"], []);
                }}
              />
            </Form.Item>

            {/* Courses */}
            <Form.Item
              name={["preferred_tutoring", "courses"]}
              label="Preferred Courses"
            >
              <Select
                mode="multiple"
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Select Courses"
                className="w-full"
                disabled={selectedCategories.length === 0}
                options={getCourseOptions(selectedCategories)}
                allowClear
                onChange={() => {
                  // Reset dependent fields when courses change
                  form.setFieldValue(["preferred_tutoring", "subjects"], []);
                }}
              />
            </Form.Item>

            {/* Subjects */}
            <Form.Item
              name={["preferred_tutoring", "subjects"]}
              label="Expert Subjects"
            >
              <Select
                mode="multiple"
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Select Subjects"
                className="w-full"
                disabled={selectedCourses.length === 0}
                options={getSubjectOptions(selectedCategories, selectedCourses)}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name={["preferred_tutoring", "tutoring_types"]}
              label="Tutoring Type"
            >
              <Select
                mode="multiple"
                placeholder="Select applicable models"
                allowClear
                className="w-full"
              >
                <Option value="home-tutoring">Home Tutoring</Option>
                <Option value="online-tutoring">Online Tutoring</Option>
                <Option value="group-tutoring">Group Tutoring</Option>
              </Select>
            </Form.Item>

            <div className="col-span-1 @md:col-span-2">
              <Form.Item
                name={["tutoring_availability", "days"]}
                label="Available Weekly Days"
              >
                <Select
                  mode="multiple"
                  placeholder="Select working days"
                  className="w-full"
                  allowClear
                >
                  {[
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ].map((day) => (
                    <Option key={day} value={day.toLowerCase()}>
                      {day}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Divider
            orientation="horizontal"
            className="m-0 mb-4 text-xs font-medium text-gray-400 uppercase tracking-wider"
            titlePlacement="start"
          >
            Teaching area
          </Divider>
          <div className="grid grid-cols-1 @sm:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name={["preferred_teaching_locations", "country"]}
              label="Country"
            >
              <Select
                placeholder="Select Country"
                options={COUNTRY_OPTIONS}
                allowClear
                onChange={() => {
                  // Clear dependent fields
                  form.setFieldValue(
                    ["preferred_teaching_locations", "city"],
                    null,
                  );
                  form.setFieldValue(
                    ["preferred_teaching_locations", "area"],
                    [],
                  );
                }}
              />
            </Form.Item>

            <Form.Item
              name={["preferred_teaching_locations", "city"]}
              label="City"
            >
              <Select
                showSearch={{ optionFilterProp: "label" }}
                placeholder="Search and select City"
                options={getCityOptions(selectedCountry)}
                disabled={!selectedCountry}
                allowClear
                onChange={() => {
                  // Clear dependent field
                  form.setFieldValue(
                    ["preferred_teaching_locations", "area"],
                    [],
                  );
                }}
              />
            </Form.Item>
            <Form.Item
              name={["preferred_teaching_locations", "area"]}
              label="Target Working Areas"
            >
              <Select
                mode="multiple"
                placeholder="Select Areas"
                options={getAreaOptions(selectedCity, selectedCountry)}
                disabled={!selectedCity}
                allowClear
              />
            </Form.Item>
          </div>
        </Card>

        {/* =========================================================================
            SECTION 3: Academic Credentials (Completed to map Mongoose nesting)
            ========================================================================= */}
        <Card
          title={
            <>
              <BookOutlined className="text-indigo-600 mr-2" /> Academic
              Credentials
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          {/* Secondary School Section */}
          <Divider
            titlePlacement="start"
            className="m-0 mb-3 text-xs font-semibold text-indigo-500 uppercase"
          >
            School Information (SSC)
          </Divider>
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name={["education", "school", "name"]}
              label="School Name"
              required
            >
              <Input placeholder="e.g. School Name" />
            </Form.Item>
            <Form.Item
              name={["education", "school", "group"]}
              label="Group"
              required
            >
              {/* <Input placeholder="e.g. Science, Commerce" /> */}
              <Select
                placeholder="Press Enter to tag: Science, Commerce"
                className="w-full"
                tokenSeparators={[","]}
              >
                <Option value="science">Science</Option>
                <Option value="commerce">Commerce</Option>
                <Option value="arts">Arts</Option>
              </Select>
            </Form.Item>
            {/* // todo: need curriculum list  */}
            <Form.Item
              name={["education", "school", "curriculum"]}
              label="Curriculum"
              required
            >
              <Input placeholder="e.g. National, Cambridge" />
            </Form.Item>
            {/* // todo: need board list */}
            <Form.Item
              name={["education", "school", "board"]}
              label="Education Board"
              required
            >
              <Input placeholder="e.g. Dhaka" />
            </Form.Item>
            <Form.Item
              name={["education", "school", "grade"]}
              label="Grade Obtained / GPA"
            >
              <Input placeholder="e.g. 5.00" />
            </Form.Item>
            <Form.Item
              name={["education", "school", "year_of_passing"]}
              label="Year of Passing"
            >
              <InputNumber
                className="w-full!"
                placeholder="YYYY"
                min={1950}
                max={2050}
              />
            </Form.Item>
          </div>

          {/* Higher Secondary Section */}
          <Divider
            titlePlacement="start"
            className="m-0 mb-3 text-xs font-semibold text-indigo-500 uppercase mt-2"
          >
            College Information (HSC)
          </Divider>
          {/* // todo: Same as school update needed */}
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name={["education", "college", "name"]}
              label="College Name"
            >
              <Input placeholder="e.g. College Name" />
            </Form.Item>
            <Form.Item
              name={["education", "college", "group"]}
              label="Group / Major"
            >
              <Input placeholder="e.g. Science" />
            </Form.Item>
            <Form.Item
              name={["education", "college", "curriculum"]}
              label="Curriculum"
            >
              <Input placeholder="e.g. National" />
            </Form.Item>
            <Form.Item
              name={["education", "college", "board"]}
              label="Education Board"
            >
              <Input placeholder="e.g. Dhaka" />
            </Form.Item>
            <Form.Item
              name={["education", "college", "grade"]}
              label="Grade Obtained / GPA"
            >
              <Input placeholder="e.g. 5.00" />
            </Form.Item>
            <Form.Item
              name={["education", "college", "year_of_passing"]}
              label="Year of Passing"
            >
              <InputNumber
                className="w-full"
                placeholder="YYYY"
                min={1950}
                max={2030}
              />
            </Form.Item>
          </div>

          {/* Undergraduate Graduation Section */}
          <Divider
            titlePlacement="start"
            className="m-0 mb-3 text-xs font-semibold text-indigo-500 uppercase mt-2"
          >
            Graduation Details (Bachelor's Degree)
          </Divider>

          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name={["education", "graduation", "name"]}
              label="University Name"
            >
              <Input placeholder="e.g. BUET, NSU" />
            </Form.Item>
            <Form.Item
              name={["education", "graduation", "department"]}
              label="Department / Subject"
            >
              <Input placeholder="e.g. Computer Science" />
            </Form.Item>
            <Form.Item
              name={["education", "graduation", "type"]}
              label="Institution Type"
            >
              <Select placeholder="Select Type" allowClear>
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["education", "graduation", "status"]}
              label="Academic Status"
            >
              <Input placeholder="e.g. Completed or 3rd Year" />
            </Form.Item>
            <Form.Item
              name={["education", "graduation", "grade"]}
              label="CGPA / Score"
            >
              <Input placeholder="e.g. 3.91" />
            </Form.Item>
            <Form.Item
              name={["education", "graduation", "year_of_passing"]}
              label="Year of Passing (If Completed)"
            >
              <InputNumber
                className="w-full!"
                placeholder="YYYY"
                min={1950}
                max={2030}
              />
            </Form.Item>
          </div>

          {/* Post Graduation Section */}
          <Divider
            titlePlacement="start"
            className="m-0 mb-3 text-xs font-semibold text-indigo-500 uppercase mt-2"
          >
            Post Graduation Details (Master's Degree)
          </Divider>
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-x-4 gap-y-1">
            <Form.Item
              name={["education", "post_graduation", "name"]}
              label="University Name"
            >
              <Input placeholder="e.g. University of Dhaka" />
            </Form.Item>
            <Form.Item
              name={["education", "post_graduation", "department"]}
              label="Department / Subject"
            >
              <Input placeholder="e.g. Applied Physics" />
            </Form.Item>
            <Form.Item
              name={["education", "post_graduation", "type"]}
              label="Institution Type"
            >
              <Select placeholder="Select Type" allowClear>
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["education", "post_graduation", "status"]}
              label="Academic Status"
            >
              <Input placeholder="e.g. Completed" />
            </Form.Item>
            <Form.Item
              name={["education", "post_graduation", "grade"]}
              label="CGPA / Score"
            >
              <Input placeholder="e.g. 3.80" />
            </Form.Item>
            <Form.Item
              name={["education", "post_graduation", "year_of_passing"]}
              label="Year of Passing"
            >
              <InputNumber
                className="w-full!"
                placeholder="YYYY"
                min={1950}
                max={2030}
              />
            </Form.Item>
          </div>
        </Card>

        {/* =========================================================================
            SECTION 4: Family & Verification Documents
            ========================================================================= */}
        <Card
          title={
            <>
              <TeamOutlined className="text-amber-600 mr-2" /> Family &
              Emergency Contacts
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          <div className="grid grid-cols-1 @sm:grid-cols-2 gap-x-4 gap-y-1">
            <Form.Item
              name={["parents_info", "father_name"]}
              label="Father's Full Name"
            >
              <Input placeholder="Father's Name" />
            </Form.Item>
            <Form.Item
              name={["parents_info", "father_phone"]}
              label="Father's Phone Number"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
            <Form.Item
              name={["parents_info", "mother_name"]}
              label="Mother's Full Name"
            >
              <Input placeholder="Mother's Name" />
            </Form.Item>
            <Form.Item
              name={["parents_info", "mother_phone"]}
              label="Mother's Phone Number"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
            <Form.Item
              name={["parents_info", "other_contact_name"]}
              label="Emergency Contact Person"
            >
              <Input placeholder="Other Contact Name" />
            </Form.Item>
            <Form.Item
              name={["parents_info", "other_contact_phone"]}
              label="Other Contact Phone Number"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
          </div>
        </Card>

        <Card
          title={
            <>
              <IdcardOutlined className="text-orange-600 mr-2" />{" "}
              Government-issued Identification Docs
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          <div className="grid grid-cols-1 @sm:grid-cols-2 gap-x-4 gap-y-1">
            <Form.Item
              name={["identification", "type"]}
              label="Identity Document Classification"
            >
              <Select placeholder="Choose Type" allowClear className="w-full">
                <Option value="nid">National ID (NID)</Option>
                <Option value="passport">Passport</Option>
                <Option value="birth_certificate">Birth Certificate</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["identification", "number"]}
              label="Document Identification Number"
            >
              <Input placeholder="e.g. NID or Passport Number" />
            </Form.Item>
          </div>

          <div className="mt-2 p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200/80">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Document Image Attachments
            </span>
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-6 justify-items-center @sm:justify-items-start">
              <Form.Item
                name={["identification", "front_image"]}
                label="Front Image File"
                valuePropName="fileList"
                className="mb-0"
                getValueFromEvent={(e: any) =>
                  Array.isArray(e) ? e : e?.fileList
                }
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <PlusOutlined />
                    <div className="mt-1 text-xs">Front Image File</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                name={["identification", "back_image"]}
                label="Back Image File"
                valuePropName="fileList"
                className="mb-0"
                getValueFromEvent={(e: any) =>
                  Array.isArray(e) ? e : e?.fileList
                }
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <PlusOutlined />
                    <div className="mt-1 text-xs">Back Image File</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Card>

        {/* =========================================================================
            SECTION 5: Certifications Form List
            ========================================================================= */}
        <Card
          title={
            <>
              <SafetyCertificateOutlined className="text-teal-600 mr-2" />{" "}
              Academic & Professional Certifications
            </>
          }
          size="small"
          className="shadow-sm border-gray-200/80 rounded-xl"
        >
          <Form.List name="certifications">
            {(fields, { add, remove }) => (
              <div className="flex flex-col gap-3">
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="grid grid-cols-12 gap-3 bg-gray-50/30 p-3 rounded-xl border border-gray-200/60 items-end"
                  >
                    <div className="col-span-12 @sm:col-span-6">
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        label="Certification Title"
                        rules={[
                          {
                            required: true,
                            message: "Certification title is required",
                          },
                        ]}
                        className="mb-0"
                      >
                        <Input placeholder="e.g. IELTS Academic, Cisco CCNA" />
                      </Form.Item>
                    </div>

                    <div className="col-span-10 @sm:col-span-5">
                      <Form.Item
                        {...restField}
                        name={[name, "file"]}
                        label="Attachment Copy"
                        valuePropName="fileList"
                        className="mb-0"
                        getValueFromEvent={(e: any) =>
                          Array.isArray(e) ? e : e?.fileList
                        }
                        rules={[
                          {
                            required: true,
                            message: "Certificate file is required",
                          },
                        ]}
                      >
                        <Upload
                          listType="picture"
                          maxCount={1}
                          beforeUpload={() => false}
                          className="w-full"
                        >
                          <Button
                            icon={<UploadOutlined />}
                            className="w-full text-left"
                          >
                            Upload Certificate File
                          </Button>
                        </Upload>
                      </Form.Item>
                    </div>

                    <div className="col-span-2 @sm:col-span-1 flex justify-center pb-2">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined className="text-base" />}
                        onClick={() => remove(name)}
                        className="hover:bg-red-50"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="py-2 border-dashed border-gray-300 text-gray-600"
                >
                  Add New Certificate Profile Entry
                </Button>
              </div>
            )}
          </Form.List>
        </Card>

        {/* Action Controls */}
        <div className="flex flex-col-reverse @sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            size="large"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full @sm:w-auto rounded-lg"
          >
            Cancel & Go Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            loading={isLoading}
            className="bg-[#355F92] hover:bg-[#2a4c75] border-none w-full @sm:w-auto rounded-lg shadow-sm"
          >
            Commit Profile Update
          </Button>
        </div>
      </Space>
    </Form>
  );
};

export default UpdateTeacherProfileForm;
