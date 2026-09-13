import {createFileRoute,redirect} from "@tanstack/react-router";
export const Route=createFileRoute("/lu-177-psma-therapy")({beforeLoad:()=>{throw redirect({to:"/nuclear-medicine-therapies/$therapy",params:{therapy:"lu-177-psma-therapy"},replace:true,statusCode:301})}});
