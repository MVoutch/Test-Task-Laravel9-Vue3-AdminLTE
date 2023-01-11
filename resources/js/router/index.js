import { createRouter, createWebHistory} from 'vue-router'
import Login from '../views/Login.vue';
import Secure from '../secure/Secure.vue';
import Employees from '../secure/employee/Employees.vue';
import EmployeeCreate from '../secure/employee/EmployeeCreate.vue';
import EmployeeEdit from '../secure/employee/EmployeeEdit.vue';
import Positions from '../secure/position/Positions.vue';
import PositionCreate from '../secure/position/PositionCreate.vue';
import PositionEdit from '../secure/position/PositionEdit.vue';

export const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Secure, children: [
            {path: '', redirect: '/employees'},
            {path: '/employees', component: Employees},
            {path: '/employee/create', component: EmployeeCreate},
            {path: '/employee/:id/edit', component: EmployeeEdit},
            {path: '/positions', component: Positions},
            {path: '/position/create', component: PositionCreate},
            {path: '/position/:id/edit', component: PositionEdit},
        ]}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
