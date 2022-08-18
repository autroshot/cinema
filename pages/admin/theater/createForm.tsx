import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import styles from './detail.module.css';

export default function CreateForm() {
  const [values, setValues] = useState({
    name: '',
    street_address: '',
    kakao_map_id: '',
    subway: '',
    bus: '',
    car: '',
    parking: '',
  });

  return (
    <Container className="mt-4">
      <h3>새 영화관 만들기</h3>
      <Table className={styles.table}>
        <colgroup>
          <col className={styles.attrCol} />
          <col className={styles.valueCol} />
        </colgroup>
        <thead>
          <tr>
            <th>속성</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>name</td>
            <td>
              <input
                className="w-100"
                name="name"
                type="text"
                value={values.name}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>street_address</td>
            <td>
              <input
                className="w-100"
                name="street_address"
                type="text"
                value={values.street_address}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>kakao_map_id</td>
            <td>
              <input
                className="w-100"
                name="kakao_map_id"
                type="text"
                value={values.kakao_map_id}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>subway</td>
            <td>
              <textarea
                className="w-100"
                name="subway"
                rows={10}
                value={values.subway}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>bus</td>
            <td>
              <textarea
                className="w-100"
                name="bus"
                rows={10}
                value={values.bus}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>car</td>
            <td>
              <textarea
                className="w-100"
                name="car"
                rows={10}
                value={values.car}
                onInput={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>parking</td>
            <td>
              <textarea
                className="w-100"
                name="parking"
                rows={10}
                value={values.parking}
                onInput={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );

  function handleChange(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
}

CreateForm.isAdminPage = true;
