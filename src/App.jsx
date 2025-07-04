import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from './components/layouts/admin-layout/AdminLayout';
import { ListAccounts } from './pages/admins/accounts/ListAccounts'
import { ListFoods } from './pages/admins/foods/ListFoods'
import { ListCoupons } from './pages/admins/coupons/ListCoupons'
import { ListOrders } from './pages/admins/orders/ListOrders'
import { ListReviews } from './pages/admins/reviews/ListReviews'
import { StatisticsRevenue } from './pages/admins/statistics/StatisticsRevenue'
import { StatisticsOrders } from './pages/admins/statistics/StatisticsOrders'
import { StatisticsFoods } from './pages/admins/statistics/StatisticsFoods'
import { StatisticsCustomers } from './pages/admins/statistics/StatisticsCustomers'
import { Dashboard } from './pages/admins/dashboard/Dashboard'
import { AddFood } from './pages/admins/foods/AddFood';
import { AddCoupon } from './pages/admins/coupons/AddCoupon';
// USER
import { UserLayout } from './components/layouts/user-layout/UserLayout';
import { Home } from './pages/users/home/Home';
import { AboutUs } from './pages/users/about-us/aboutus';
import { Cart } from './pages/users/cart/Cart';
import { Login } from './pages/users/login/Login';
import { ForgotPassword } from './pages/users/forgot-password/forgotpassword';
import { Register } from './pages/users/register/Register';
import { Account } from './pages/users/account/Account';
import { Order } from './pages/users/order/Order';
import { Explore } from './pages/users/explore/Explore';
import { PayATM } from './pages/users/payment/PayATM';
import { Payment } from './pages/users/payment/Payment';
import { FoodDetail } from './pages/users/food/fooddetail';

//auth
import { AuthLoggedIn } from './components/layouts/auth-logged-in/AuthLoggedIn';
import { LoginAdmin } from './pages/admins/login-admin/LoginAdmin';
import { useSession } from './context/SessionContext';
import { MasterLayout } from './components/layouts/master-layout/MasterLayout';


function App() {


    const { user } = useSession()

    return (
        <>
            <Routes>
                <Route element={<MasterLayout />}>

                    {/* admin routes */}
                    {
                        (user !== null && user.is_admin === 1) ? <>
                            <Route path='admin' element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path='accounts'>
                                    <Route index element={<ListAccounts />} />
                                </Route>
                                <Route path='foods'>
                                    <Route index element={<ListFoods />} />
                                    <Route path='add' element={<AddFood />} />
                                </Route>
                                <Route path='coupons'>
                                    <Route index element={<ListCoupons />} />
                                    <Route path='add' element={<AddCoupon />} />
                                </Route>
                                <Route path='orders'>
                                    <Route index element={<ListOrders />} />
                                </Route>
                                <Route path='reviews'>
                                    <Route index element={<ListReviews />} />
                                </Route>
                                <Route path='statistics'>
                                    <Route path='revenue' element={<StatisticsRevenue />} />
                                    <Route path='orders' element={<StatisticsOrders />} />
                                    <Route path='foods' element={<StatisticsFoods />} />
                                    <Route path='customers' element={<StatisticsCustomers />} />
                                </Route>
                            </Route>
                        </> : null
                    }
                    {/* user-routes */}
                    <Route element={<UserLayout />}>
                        <Route index element={<Home />} />
                        <Route path='about-us' element={<AboutUs />} />
                        <Route path='explore' element={<Explore />} />
                        <Route path='foods/:slug' element={<FoodDetail />} />

                        {/* can dang nhap */}
                        {
                            (user !== null && user.is_admin === 0) ? <>
                                <Route path='my-cart' element={<Cart />} />
                                <Route path='my-order' element={<Order />} />
                                <Route path='my-account' element={<Account />} />
                                <Route path='payment' element={<Payment />} />
                                <Route path='pay-atm' element={<PayATM />} />

                            </> : null
                        }
                    </Route>

                    {/* auth-logged-in */}
                    <Route element={<AuthLoggedIn />}>
                        <Route path='login' element={<Login />} />
                        <Route path='admin/login' element={<LoginAdmin />} />
                        <Route path='register' element={<Register />} />
                        <Route path='forgot-password' element={<ForgotPassword />} />

                    </Route>
                </Route>

            </Routes>
        </>
    )
}

export default App
