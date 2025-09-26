import LogButton from '@/components/workout/log-workout/log-button';
import { Button } from '@/components/ui/button';
import { SetsProps } from '@/types/types';

export default async function LogTable({ sets }: SetsProps) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Set</th>
            <th>Previous</th>
            <th>Weight</th>
            <th>Reps</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sets?.map((set, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {set.weight} X {set.reps}
              </td>
              <td>
                <input type='number' defaultValue={set.weight} />
              </td>
              <td>
                <input type='number' defaultValue={set.reps} />
              </td>
              <td>
                <LogButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button>Add set</Button>
    </>
  );
}
