/* tslint:disable:max-line-length */
import { WorthBankNavigationItem } from '@worthbank/components/navigation';

export const defaultNavigation: WorthBankNavigationItem[] = [
    {
        id      : 'dashboard',
        title   : 'Sistema de ventas',
        subtitle: 'Organización y control',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboard.home',
                title: 'Inicio',
                type : 'basic',
                icon : 'heroicons_outline:home',
                link : '/dashboard/home'
            },
            {
                id   : 'dashboard.clients',
                title: 'Clientes',
                type : 'collapsable',
                icon : 'heroicons_outline:user-group',
                children: [
                    {
                        id   : 'dashboard.inventory',
                        title: 'Lista de clientes',
                        type : 'basic',
                        link : '/dashboard/clients',
                    },
                    {
                        id   : 'dashboard.payments',
                        title: 'Planes de pago',
                        type : 'basic',
                        link : '/dashboard/payments'
                    },
                ]
            },
            {
                id   : 'dashboard.catalog',
                title: 'Automóviles',
                type : 'basic',
                icon : 'heroicons_outline:truck',
                link : '/dashboard/catalog'
            },          
        ]
    },
];
