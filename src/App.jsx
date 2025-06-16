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
import { Dashboard } from './pages/admins/Dashboard'
import { AddFood } from './pages/admins/foods/AddFood';
import { AddCoupon } from './pages/admins/coupons/AddCoupon';

function App() {
    return (
        <>
            <Routes>
                {/* admin routes */}
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
            </Routes>
        </>
    )
}

export default App
