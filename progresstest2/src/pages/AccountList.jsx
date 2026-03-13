import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchAccounts, updateAccount } from '../services/api';
import FilterBar from '../components/Footer';
import ConfirmationModal from '../components/Header';
import ToastMessage from '../components/ToastMessage';
import { FaLock, FaUnlock, FaEye } from 'react-icons/fa';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [action, setAction] = useState('');
    const [toast, setToast] = useState({ show: false, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        const response = await fetchAccounts();
        setAccounts(response.data);
        setFilteredAccounts(response.data);
    };

    const handleViewDetails = (id) => {
        navigate(`/account/${id}`);
    };

    // Trong hàm handleLockUnlock của AccountList.jsx
    const handleLockUnlock = (account, action) => {
        // Kiểm tra nếu đang cố lock chính mình
        if (account.username === state.user?.username) {
            setToast({
                show: true,
                message: 'You cannot lock/unlock your own account!'
            });
            return;
        }

        setSelectedAccount(account);
        setAction(action);
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (selectedAccount.username === 'admin') {
            setToast({ show: true, message: 'Cannot lock/unlock admin account!' });
            setShowModal(false);
            return;
        }

        const newStatus = action === 'lock' ? 'locked' : 'active';
        await updateAccount(selectedAccount.id, { status: newStatus });

        // Cập nhật UI
        setAccounts(accounts.map(acc =>
            acc.id === selectedAccount.id ? { ...acc, status: newStatus } : acc
        ));

        setToast({
            show: true,
            message: `${action === 'lock' ? 'Locked' : 'Unlocked'} successfully!`
        });
        setShowModal(false);
    };

    return (
        <Container>
            <h2 className="my-4">Account Management</h2>

            <FilterBar
                accounts={accounts}
                setFilteredAccounts={setFilteredAccounts}
            />

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map(account => (
                        <tr key={account.id}>
                            <td>
                                <Image
                                    src={`/images/users/${account.avatar}`}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                />
                            </td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>{account.role}</td>
                            <td>
                                <span className={`badge bg-${account.status === 'active' ? 'success' : 'danger'}`}>
                                    {account.status}
                                </span>
                            </td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleViewDetails(account.id)}
                                >
                                    <FaEye /> View
                                </Button>
                                <Button
                                    variant={account.status === 'active' ? 'warning' : 'secondary'}
                                    size="sm"
                                    onClick={() => handleLockUnlock(
                                        account,
                                        account.status === 'active' ? 'lock' : 'unlock'
                                    )}
                                >
                                    {account.status === 'active' ? <FaLock /> : <FaUnlock />}
                                    {account.status === 'active' ? 'Lock' : 'Unlock'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ConfirmationModal
                show={showModal}
                account={selectedAccount}
                action={action}
                onConfirm={confirmAction}
                onCancel={() => setShowModal(false)}
            />

            <ToastMessage
                show={toast.show}
                message={toast.message}
                onClose={() => setToast({ show: false, message: '' })}
            />
        </Container>
    );
};

export default AccountList;