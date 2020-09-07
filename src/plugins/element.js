import Vue from 'vue'
import {
  Aside,
  Avatar,
  Badge,
  Button,
  Card,
  Carousel,
  CarouselItem,
  Checkbox,
  Col,
  Container,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Image,
  Input,
  Main,
  Message,
  MessageBox,
  Row,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
  Pagination, Menu, MenuItem
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Checkbox)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Tooltip)
Vue.use(Container)

