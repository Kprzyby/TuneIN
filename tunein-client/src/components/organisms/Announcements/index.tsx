import React, { useEffect, useState } from "react";
import Announcement from "@components/organisms/Announcement";
import { useRouter } from "next/navigation";
import Loader from "@components/atoms/Loader";
import DarkButton from "@components/molecules/DarkButton";

import { ENDPOINTS, createDBEndpoint } from "../../../api/endpoint";

import * as Styled from "./styles";
import { Props, Tuition } from "./types";
import { sortValues } from "./consts";

const Announcements: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [sortKey, setSortKey] = useState("names");

  function sortTuitions(key: string) {
    const tempArray: Tuition[] = [...tuitions];

    switch (key) {
      case "names":
        tempArray?.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;

          return 0;
        });
        break;
      case "author":
        tempArray?.sort((a, b) => {
          if (a.author.username < b.author.username) return -1;
          if (a.author.username > b.author.username) return 1;

          return 0;
        });
        break;
      case "price":
        tempArray?.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;

          return 0;
        });
        break;
      default:
        tempArray?.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;

          return 0;
        });
        break;
    }

    return tempArray;
  }
  const getTutorships = async () => {
    const value = { pageSize: 1000, pageNumber: 1 };

    if (id) {
      await createDBEndpoint(ENDPOINTS.tutorship.getusertutorships + id)
        .post(value)
        .then((res: any) => {
          setTuitions(res.data.tutorships);
          setLoading(false);
        });
    } else {
      await createDBEndpoint(ENDPOINTS.tutorship.gettutorships)
        .post(value)
        .then((res: any) => {
          setTuitions(res.data.tutorships);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    // for some reason next trys to exec getusertutorships beforehead
    // error still accures
    setLoading(true);
    getTutorships();
  }, [router.refresh]);
  useEffect(() => {
    const sortedArray = sortTuitions(sortKey);

    setTuitions(sortedArray);
  }, [sortKey]);

  return (
    <Styled.Wrapper>
      <Styled.Content>
        {loading ? (
          <div
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <Loader borderColor="white transparent" />
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            {!id && (
              <ul style={{ width: "100%", padding: "1rem 0.5rem" }}>
                {sortValues.map((s) => (
                  <button
                    style={{
                      background: "transparent",
                      border: "unset",
                      cursor: "pointer",
                    }}
                    key={s.id}
                    type="button"
                    onClick={() => setSortKey(s.value)}
                  >
                    <DarkButton text={s.label} />
                  </button>
                ))}
              </ul>
            )}
            <Styled.List>
              {tuitions.length > 0 &&
                tuitions.map((t) => (
                  <Announcement
                    key={t.id}
                    tuitionId={t.id}
                    title={t.title}
                    author={t.author.username}
                    img={t.imageDataURL}
                  />
                ))}
            </Styled.List>
          </div>
        )}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Announcements;
