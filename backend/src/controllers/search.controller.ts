import {Request, Response} from 'express';
import BaseController from './BaseController';
import DevModel from '../models/dev.model';
import stringToArray from '../utils/stringToArray';

export default class SearchController implements BaseController {
  protected static _instance = new SearchController();

  public static get instance() {
    return SearchController._instance;
  }
  

  public async index(req: Request, res: Response): Promise<Response> {
    const { latitude, longitude, techs }: {latitude: number; longitude: number; techs: string} = req.query;

    const techsArray = stringToArray(techs);

    const devs = await DevModel.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.status(200).send(devs);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }

  public async store(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }

}
