import Annonce  from './annonce';

export class Message {
    annonces: Annonce[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}