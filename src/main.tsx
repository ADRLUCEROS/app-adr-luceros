import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from './App.tsx'

import { ManageStore } from '@/pages/manage-store/manage-store.tsx';
import { ManageTruck } from '@/pages/manage-truck/manage-truck.tsx';
import { ManageWorker } from '@/pages/manage-worker/manage-worker.tsx';
import { ManagePartner } from '@/pages/manage-partner/manage-partner.tsx';
import { ManageDelivery } from '@/pages/manage-delivery/manage-delivery.tsx';

import { ROUTES } from '@/const/router.ts'
import { FormTruck } from './pages/manage-truck/form-truck.tsx';
const { delivery, partner, store, truck, worker } = ROUTES.manage

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Navigate to='manage-store' replace />} />
          <Route path={store} element={<ManageStore />} />
          <Route path={truck} element={<ManageTruck />} />
          <Route path={`${truck}/form-truck`} element={<FormTruck />} />
          <Route path={worker} element={<ManageWorker />} />
          <Route path={partner} element={<ManagePartner />} />
          <Route path={delivery} element={<ManageDelivery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
