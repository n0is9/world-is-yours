import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { logout } from '@redux/userSlice';

import Container from '@common/Container';
import Personal from '@components/profile/Personal';
import NotFound404 from './NotFound404';
import Address from '@components/profile/Address';
import History from '@components/profile/History';
import Button from '@common/Button';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const paramComponent = searchParams.get('component');
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    const urlSearchParams = new URLSearchParams(window.location.search);

    urlSearchParams.set('component', component);
    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`);
  };

  useEffect(() => {
    if (paramComponent) {
      setSelectedComponent(paramComponent);
    } else {
      setSelectedComponent('personal');
    }
  }, [paramComponent]);

  if (!user.email) {
    console.log('user in store==' + JSON.stringify(user, null, 2));

    return <NotFound404 />;
  }

  return (
    <Container>
      <div className="w-screen pt-20 px-170 pb-150">
        <h1 className="text-40px flex font-raleway text-2xl font-semibold">Профіль</h1>
        <div className="flex  mt-50  flex-col xl:flex-row">
          {/* left side */}
          <div className="min-w-235  h-80 flex flex-col items-start gap-2">
            <Button
              classNameBtn={`font-raleway text-base font-medium ${
                selectedComponent === 'personal' ? 'underline text-black' : 'text-gray'
              }`}
              onClickBtn={() => handleComponentClick('personal')}
            >
              Контактна інформація
            </Button>
            <Button
              classNameBtn={`font-raleway text-base font-medium ${selectedComponent === 'addresses' ? 'underline text-black' : 'text-gray'}`}
              onClickBtn={() => handleComponentClick('addresses')}
            >
              Адресна книга
            </Button>
            <Button
              classNameBtn={`font-raleway text-base font-medium ${selectedComponent === 'history' ? 'underline text-black' : 'text-gray'}`}
              onClickBtn={() => handleComponentClick('history')}
            >
              Історія замовлень
            </Button>
            <Button
              classNameBtn={`font-raleway text-base font-medium ${selectedComponent === 'return' ? 'underline text-black' : 'text-gray'}`}
              onClickBtn={() => {
                dispatch(logout());
                Cookies.remove('user');
                navigate('/');
              }}
            >
              Вихід
            </Button>
          </div>

          {/* right side */}
          <div className="basis-5/5 pl-70 border-l border-solid border-gray-500">
            {selectedComponent === 'personal' && <Personal />}
            {selectedComponent === 'addresses' && <Address />}
            {selectedComponent === 'history' && (
              <div>
                <History />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
