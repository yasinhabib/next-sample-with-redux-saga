import { Box, Modal, SxProps, Theme } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface IModals{
    children: React.ReactNode,
    open: boolean,
    title: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    width?: string|number
}

const BoxContainer : SxProps<Theme> = {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const BoxModal : SxProps<Theme> = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    margin: '0px 10px',
    maxWidth: '100%',
    p: 2
}

const ModalTitleContainer : SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const Modals = ({children,open,title,setOpen,width}: IModals) => {
    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={BoxContainer}>
                <Box sx={{...BoxModal,width: width}}>
                    <Box sx={ModalTitleContainer}>
                        <span style={{fontWeight: 'bold', fontSize: '20px'}}>{title}</span>
                        <IconButton aria-label="delete" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}

export default Modals