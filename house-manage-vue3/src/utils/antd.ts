/*
 * @Author: heinan
 * @Date: 2023-07-04 16:48:59
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-05 08:36:50
 */
import 'ant-design-vue/dist/antd.less'
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  PageHeader,
  message,
  notification,
  Collapse,
  Pagination,
  Carousel,
  Empty,
  Space
} from 'ant-design-vue'
export default (Vue: any) => {
  Vue.use(ConfigProvider)
  Vue.use(Layout)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Button)
  Vue.use(Switch)
  Vue.use(Radio)
  Vue.use(Checkbox)
  Vue.use(Select)
  Vue.use(Card)
  Vue.use(Form)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Modal)
  Vue.use(Table)
  Vue.use(Tabs)
  Vue.use(Badge)
  Vue.use(Popover)
  Vue.use(Dropdown)
  Vue.use(List)
  Vue.use(Avatar)
  Vue.use(Breadcrumb)
  Vue.use(Spin)
  Vue.use(Menu)
  Vue.use(Drawer)
  Vue.use(Tooltip)
  Vue.use(Alert)
  Vue.use(Tag)
  Vue.use(Divider)
  Vue.use(DatePicker)
  Vue.use(TimePicker)
  Vue.use(Upload)
  Vue.use(PageHeader)
  Vue.use(Collapse)
  Vue.use(Pagination)
  Vue.use(Carousel)
  Vue.use(Empty)
  Vue.use(Space)
  // Vue.prototype.$message = message
  // Vue.prototype.$Message = message
  // Vue.prototype.$notification = notification
  // Vue.prototype.$confirm = Modal.confirm
  // Vue.prototype.$info = Modal.info
  // Vue.prototype.$success = Modal.success
  // Vue.prototype.$error = Modal.error
  // Vue.prototype.$warning = Modal.warning
}
