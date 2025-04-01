import { AuthUser } from "@/type/auth";
import { Customer, GroupMember, GroupType } from "@/type/group-type";
import { apiUrls } from "./apiUrls";
import HttpClient from "./http-client";

class ApiClient {
  // private baseUrl: string =
  //   "https://cirse-portals-83faa4ddee7c.herokuapp.com/api/v1";

  private baseUrl: string = "http://localhost:8080/api/v1";

  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(this.baseUrl);
  }

  // Example functions
  public async getUserData(userId: number): Promise<any> {
    return this.httpClient.request<any>(`/users/${userId}`);
  }

  public async postData(endpoint: string, data: any): Promise<any> {
    return this.httpClient.request<any>(endpoint, "POST", {}, data);
  }

  //AUTHENTICATION
  public async login(data: any): Promise<AuthUser> {
    return this.httpClient.unauthenticatedRequest<AuthUser>(
      apiUrls.auth.login,
      "POST",
      {},
      data
    );
  }

  //GROUPS
  public async getGroups(): Promise<GroupType[]> {
    return this.httpClient.request<GroupType[]>(apiUrls.groups.get);
  }

  public async getGroupMembers(contactId: string): Promise<GroupMember[]> {
    return this.httpClient.request<GroupMember[]>(
      `${apiUrls.groups.get}/${contactId}`
    );
  }

  public async getGroupCustomer(emails: string[]): Promise<Customer[]> {
    return this.httpClient.request<Customer[]>(
      `${apiUrls.groups.get}/get-participants`,
      "POST",
      {},
      emails
    );
  }
}

export default ApiClient;
