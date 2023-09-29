import { AcademyMockApi } from 'app/mock-api/apps/catalog/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { ClientsMockApi } from 'app/mock-api/apps/clients/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { ProjectMockApi } from 'app/mock-api/dashboards/project/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { UserMockApi } from 'app/mock-api/common/user/api';

export const mockApiServices = [
    AcademyMockApi,
    AuthMockApi,
    ClientsMockApi,


    NavigationMockApi,
    ProjectMockApi,
    SearchMockApi,
    UserMockApi
];
