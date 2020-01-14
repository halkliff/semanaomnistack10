import { Request, Response } from 'express';

export default abstract class BaseController {

  protected static _instance: BaseController;

  public static get instance(): BaseController {
    return BaseController._instance;
  };

  public abstract async index(req: Request, res: Response): Promise<Response>;

  public abstract async show(req: Request, res: Response): Promise<Response>;

  public abstract async store(req: Request, res: Response): Promise<Response>;

  public abstract async update(req: Request, res: Response): Promise<Response>;

  public abstract async destroy(req: Request, res: Response): Promise<Response>;

}
