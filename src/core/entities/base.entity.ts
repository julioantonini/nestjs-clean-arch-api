import { UniqueEntityId } from './unique-entity-id';

export class BaseEntity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  get id(): UniqueEntityId {
    return this._id;
  }

  constructor(props: any, id?: string) {
    this.props = props;
    this._id = new UniqueEntityId(id);
  }
}
