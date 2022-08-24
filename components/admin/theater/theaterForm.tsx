import { TheaterFormValues } from 'pages/admin/theaters/create';
import { Table } from 'react-bootstrap';
import styles from './theaterForm.module.css';

export default function TheaterForm(props: Props) {
  return (
    <Table className={styles.table}>
      <colgroup>
        <col className={styles.fieldCol} />
        <col className={styles.valueCol} />
      </colgroup>
      <thead>
        <tr>
          <th>필드</th>
          <th>값</th>
        </tr>
      </thead>
      <tbody>
        {props.id ? (
          <tr>
            <td>
              <label htmlFor="id">id</label>
            </td>
            <td>
              <span id="id">{props.id}</span>
            </td>
          </tr>
        ) : null}
        <tr>
          <td>
            <label htmlFor="name">name</label>
          </td>
          <td>
            <input
              id="name"
              name="name"
              type="text"
              maxLength={50}
              placeholder="필숫값"
              className="w-100"
              value={props.values.name}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="street_address">street_address</label>
          </td>
          <td>
            <input
              id="street_address"
              name="street_address"
              type="text"
              maxLength={200}
              placeholder="필숫값"
              className="w-100"
              value={props.values.street_address}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="google_maps_place_id">google_maps_place_id</label>
          </td>
          <td>
            <input
              id="google_maps_place_id"
              name="google_maps_place_id"
              type="text"
              maxLength={1000}
              placeholder="필숫값"
              className="w-100"
              value={props.values.google_maps_place_id}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="subway">subway</label>
          </td>
          <td>
            <textarea
              id="subway"
              name="subway"
              maxLength={1000}
              rows={10}
              className="w-100"
              value={props.values.subway}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="bus">bus</label>
          </td>
          <td>
            <textarea
              id="bus"
              name="bus"
              maxLength={1000}
              className="w-100"
              rows={10}
              value={props.values.bus}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="car">car</label>
          </td>
          <td>
            <textarea
              id="car"
              name="car"
              maxLength={1000}
              className="w-100"
              rows={10}
              value={props.values.car}
              onChange={props.onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="parking">parking</label>
          </td>
          <td>
            <textarea
              id="parking"
              name="parking"
              maxLength={1000}
              className="w-100"
              rows={10}
              value={props.values.parking}
              onChange={props.onChange}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

interface Props {
  id?: number;
  values: TheaterFormValues;
  onChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
