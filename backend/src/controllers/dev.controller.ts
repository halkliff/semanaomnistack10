import { Request, Response } from "express";
import axios from "axios";
import DevModel from "../models/dev.model";
import { PointInterface } from "utils/pointSchema";
import BaseController from './BaseController';
import stringToArray from '../utils/stringToArray';

export interface DevRequestBody {
  github_username: string;
  techs: string;
  latitude: number;
  longitude: number;
}

export default class DevController implements BaseController {
  protected static _instance = new DevController();

  public static get instance() {
    return DevController._instance;
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const devs = await DevModel.find();

    return res.status(200).json(devs);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }


  public async store(req: Request, res: Response): Promise<Response> {
    const {
      github_username,
      techs,
      latitude,
      longitude
    }: DevRequestBody = req.body;

    let dev = await DevModel.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = response.data.login, avatar_url, bio } = response.data;

      const techsArray: string[] = stringToArray(techs);

      const location: PointInterface = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await DevModel.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.status(201).json(dev);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    return res.status(404).send();
  }
}
