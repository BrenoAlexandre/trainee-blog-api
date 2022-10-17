export interface IUseCase {
  execute(data: any): Promise<any> | any;
}
