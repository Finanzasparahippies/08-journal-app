import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"



export const SideBar = ({ drawerWidth=240 }) => {
    return (
    <Box
    component='nav'
    sx={{
        width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx= {{
                display: { xs: 'block', },
                '& .MuiDrawer-paper': { boxSixing: 'border-box', width: drawerWidth }
            }}>
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>Saul Villegas</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                            </ListItemButton>
                            <Grid container>
                                <ListItemText primary = { text} />
                                <ListItemText secondary = { 'Aute ad veniam labore labore officia mollit aliquip duis non.' } />
                            </Grid>

                        </ListItem>
                    ))
                    }
                </List>
        </Drawer>

    </Box>
    )
}
