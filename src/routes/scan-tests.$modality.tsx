import {createFileRoute,Outlet} from '@tanstack/react-router';
export const Route=createFileRoute('/scan-tests/$modality')({component:()=> <Outlet/>});
