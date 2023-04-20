import React, { useContext, useEffect, useState } from 'react';
import { UserData } from '@components/context/UserContext';
import { Typography } from '@components/styles/typography';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import TuitionForm from '../TuitionForm';

const EditTuitions:React.FC = () => {
  const [pLast, setPLast] = useState<number | undefined>(undefined);
  const [addItem, setAddItem] = useState(false);
  const [tuitions, setTuitions] = useState(
    {
      tutorships: [
        {
          id: 0,
          title: '',
          details: '',
          price: 0,
          category: '',
          author: {
            id: 0,
            username: '',
          },
        }],
    },
  );
  const { user } = useContext(UserData);
  useEffect(() => {
    if (user?.id === undefined) return;
    // temporary
    const value = { pageSize: 100, pageNumber: 1 };
    createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + user.id)
      .post(value)
      .then((res) => setTuitions(
        { tutorships: res.data.tutorships.sort((a: any, b: any) => a.id - b.id) },
      ));
  }, [user]);
  const handleItemClick = (id: number) => {
    if (id === pLast) {
      setPLast(undefined);
    } else {
      setPLast(id);
    }
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>
        <Typography variant="RegisterSuccess" style={{ flex: '0.2' }}>Id</Typography>
        <Typography variant="RegisterSuccess" style={{ flex: '1' }}>Title</Typography>
        <Typography variant="RegisterSuccess" style={{ flex: '0.7' }}>Category</Typography>
        <Typography variant="RegisterSuccess" style={{ flex: '1' }}>Price</Typography>
      </Styled.Header>
      <Styled.List>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          onClick={() => setAddItem(!addItem)}
        >
          <Styled.AddBtn>
            <DarkButton text="Add new Tuition" />
          </Styled.AddBtn>
        </div>
        {addItem && <TuitionForm />}
        {tuitions.tutorships.map((t) => (
          <li key={t.id} style={{ padding: '0.4rem 0' }}>
            <Styled.IBtn
              type="button"
              onClick={() => handleItemClick(t.id)}
            >
              <Styled.Item variant="EditorList" flexPart={0.2}>{t.id}</Styled.Item>
              <Styled.Item variant="EditorList" flexPart={1}>{t.title}</Styled.Item>
              <Styled.Item variant="EditorList" flexPart={0.7}>{t.category}</Styled.Item>
              <Styled.Item variant="EditorList" flexPart={1}>{t.price}</Styled.Item>
            </Styled.IBtn>
            {pLast === t.id && addItem === false && <TuitionForm tuition={t} />}
          </li>
        ))}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default EditTuitions;
