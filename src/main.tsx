import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from './App.tsx'

import { ManageStore } from '@/pages/manage-shop/manage-shop.tsx';
import { ManageTruck } from '@/pages/manage-truck/manage-truck.tsx';
import { ManageWorker } from '@/pages/manage-worker/manage-worker.tsx';
import { ManagePartner } from '@/pages/manage-partner/manage-partner.tsx';
import { ManageDelivery } from '@/pages/manage-delivery/manage-delivery.tsx';

import { ROUTES } from '@/const/router.ts'
import { FormTruck } from './pages/manage-truck/form-truck.tsx';
import { ContentStoreBusiness } from './pages/content-store-business.tsx';
import { ManageBusiness } from './pages/manage-business/manage-business.tsx';
import { Page404 } from './pages/page404.tsx';
import { ContentWorkerRol } from './pages/content-worker-rol.tsx';
import { ManageRol } from './pages/manage-rol/manage-rol.tsx';
import { ContentPartnerStorehouse } from './pages/content-partner-storehouse.tsx';
import { ManageStorehouse } from './pages/manage-storehouse/manage-storehouse.tsx';
const { delivery, partner, store, truck, worker } = ROUTES.manage

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Navigate to='manage-store' replace />} />
          <Route path={store} element={<ContentStoreBusiness />}>
            <Route index element={<ManageStore />}/>
            <Route path={`${store}/business`} element={<ManageBusiness />}/>
          </Route>
          <Route path={truck} element={<ManageTruck />}/>
          <Route path={`${truck}/form-truck`} element={<FormTruck />} />
          <Route path={worker} element={<ContentWorkerRol />}>
            <Route index element={<ManageWorker />}/>
            <Route path={`${worker}/rol`} element={<ManageRol />}/>
          </Route>
          <Route path={partner} element={<ContentPartnerStorehouse />}>
            <Route index element={<ManagePartner />}/>
            <Route path={`${partner}/storehouse`} element={<ManageStorehouse />}/>
          </Route>
          <Route path={delivery} element={<ManageDelivery />} />
          <Route path='*' element={<Page404 />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
