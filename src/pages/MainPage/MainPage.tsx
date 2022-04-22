import React, { FC, useEffect, useMemo } from 'react';
import { UserItem } from '../../components/UserItem/UserItem';
import styles from './MainPage.module.scss';
import {
  clearData,
  fetchUsers,
  setCurrentPage,
  setNewOrderItems,
  setResultsPerPage,
} from '../../store/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Filter } from '../../components/Filter/Filter';
import { createPages } from '../../utils/createPages';
import { reorder } from '../../utils/reorder';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { COUNT_OF_PAGES } from '../../utils/const';
import { useNavigate } from 'react-router-dom';
import { setCurrentUserData } from '../../store/users/currentUserSlice';
import { User } from '../../types/user';
import Arrow from '../../assets/svg/arrow-svgrepo-com.svg';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(state => state.usersReducer.filteredItems);
  const currentPage = useAppSelector(state => state.usersReducer.currentPage);
  const filter = useAppSelector(state => state.usersReducer.filter);
  const sort = useAppSelector(state => state.usersReducer.sort);
  const perPage = useAppSelector(state => state.usersReducer.perPage);

  const pages = useMemo(() => {
    const pagesArr: number[] = [];
    const pagesCount = COUNT_OF_PAGES;
    createPages(pagesArr, pagesCount, currentPage);
    return pagesArr;
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchUsers({ currentPage, gender: filter.gender, perPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, dispatch, filter.gender, perPage]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(users, result.source.index, result.destination.index);
    dispatch(setNewOrderItems(items));
  };

  const onClickEdit = (user: User) => {
    // ? there should have been a request for user data after the transition
    dispatch(setCurrentUserData(user));
    navigate(`/user/${user.login.uuid}`, {
      replace: false,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        <div className={styles.filterTitle}>Filter</div>
        <Filter />
      </div>
      <div className={styles.usersListContainer}>
        <div className={styles.usersListTitle}>List of users</div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {users.map((user, index) => (
                  <Draggable
                    isDragDisabled={sort.type !== 'custom sort'}
                    key={user.login.uuid}
                    draggableId={`${user.login.uuid}-id`}
                    index={index}
                  >
                    {provided => (
                      <div
                        style={provided.draggableProps.style}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.listItem}
                      >
                        <UserItem
                          key={user.login.uuid}
                          avatarUrl={user.picture.medium}
                          userName={`${user.name.first} ${user.name.last}`}
                          email={user.email}
                          address={`${user.location.city}, ${user.location.street.name} ${user.location.street.number}`}
                          date={user.dob.date}
                          onClickEdit={() => onClickEdit(user)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.paginationContainer}>
          <div className={styles.paginationButtons}>
            {currentPage !== 1 && (
              <button
                type="button"
                className={styles.paginationBtn}
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              >
                <img src={Arrow} alt="prev page" className={styles.arrowPrev} />
                Prev Page
              </button>
            )}
            {pages.map(page => (
              <button
                type="button"
                className={`${styles.paginationBtn} ${
                  page === currentPage ? styles.active : ''
                }`}
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
              >
                {page}
              </button>
            ))}
            {currentPage < COUNT_OF_PAGES && (
              <button
                type="button"
                className={styles.paginationBtn}
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              >
                Next Page
                <img src={Arrow} alt="next page" className={styles.arrowNext} />
              </button>
            )}
          </div>
          <select
            className={styles.perPageSelect}
            value={perPage}
            onChange={e => {
              dispatch(setResultsPerPage(Number(e.target.value)));
            }}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};
