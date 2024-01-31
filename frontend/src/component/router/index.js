import CardById from "../pages/GetItemById/CardById";
import CardHistory from "../pages/CardAbility/history/CardHistory";
import BillById from "../pages/GetItemById/BillById";
import CreditById from "../pages/GetItemById/CreditById";
import CreditInfo from "../pages/CardAbility/CreditInfo";
import TransferUser from "../pages/CardAbility/Payment/TransferUser";
import Payment from "../pages/CardAbility/Payment/Payment";
import TransferBetween from "../pages/CardAbility/Payment/TransferBetween";
import SessionHistory from "../pages/LK/PersonAbility/SessionHistory";
import {ATMS, BILL, CARD, CREDIT, CURRENCY, HISTORY, PAY} from "../../utils/consts";
import PayService from "../pages/CardAbility/Payment/PayService";
import ValutaCourse from "../Valuta/ValutaCourse";
import BuyValute from "../Valuta/CurerncyExchange/ExchangeValute";
import RegForm from "../pages/Auth/Registration/RegForm";
import CreateBill from "../pages/MainPage/OpenBill/CreateBill";
import CreateCard from "../pages/MainPage/OpenBill/CreateCard";
import YandexMap from "../Maps/YandexMap";
import MainPage from "../pages/MainPage/MainPage";
import Auth from "../pages/Auth/Auth";
import PersonalArea from "../pages/LK/PersonalArea";


export const privateRoutes=[
    {path:"/*", component:<MainPage/>},
    {path:'/user/:login', component: <PersonalArea/>},
    {path:CURRENCY, component: <ValutaCourse/>},
    {path:ATMS, component: <YandexMap/>},
    {path: CARD+'/:id', component: <CardById/>},
    {path:CREDIT+'/info/:id', component: <CreditInfo/>},
    {path:BILL+'/:id', component: <BillById/>},
    {path:CREDIT+'/:id', component: <CreditById/>},
    {path:CARD+HISTORY+'/:account_number/:token_card', component: <CardHistory/>},
    {path:BILL+HISTORY+'/:account_number/', component: <CardHistory/>},
    {path:CREDIT+HISTORY+'/:account_number/', component: <CardHistory/>},
    {path:PAY+'/transfer/between', component: <TransferBetween/>},
    {path:PAY+'/service', component: <PayService/>},
    {path:PAY+'/transfer/user', component: <TransferUser/>},
    {path:PAY, component: <Payment/>},
    {path:'/lastlogin', component: <SessionHistory/>},
    {path:'/buyvalute/:charcode', component: <BuyValute/>},
    {path:'/new_bill', component: <CreateBill/>},
    {path:'/new_card', component: <CreateCard/>},
    {path:'/buyvalute/:code', component: <BuyValute/>}
]

export const publicRoutes=[
    {path:"/*", component:<Auth/>},
    {path: '/registration', component: <RegForm/>},
    {path:ATMS, component: <YandexMap/>},
    {path:CURRENCY, component: <ValutaCourse/>}
]