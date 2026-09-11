import {createFileRoute,Outlet} from '@tanstack/react-router';
export const Route=createFileRoute('/scan-centres/$city')({component:()=> <Outlet/>});
