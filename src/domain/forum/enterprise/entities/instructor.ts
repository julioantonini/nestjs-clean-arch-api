import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IInstructorProps {
  name: string;
}

export class Instructor extends BaseEntity<IInstructorProps> {
  static create(props: IInstructorProps, id: UniqueEntityId): Instructor {
    const instructor = new Instructor(props, id);
    return instructor;
  }
}
