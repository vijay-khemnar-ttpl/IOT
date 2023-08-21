import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, CircularProgress, TextField, Button, Card, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDataSourceForSites } from '../../../../service/Sites';
import { useNotification } from '../../../../hooks/use-notification';

const validationSchema = yup.object({
  site_name: yup.string().required("This is a required field."),
  address: yup.string().required("This is a required field."),
  zipcode: yup.string().required("This is a required field."),
  state: yup.string().required("This is a required field."),
  country: yup.string().required("This is a required field."),
});
const initialValues = {
  site_name: '',
  address: '',
  zipcode: '',
  state: '',
  country: '',
};

const CreateSiteForm = React.memo(() => {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { create_Site } = useDataSourceForSites();
  const { notifyError, notifySuccess } = useNotification();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setBusy(true);
        const response = await create_Site(values.site_name, values.address, values.zipcode, values.state, values.country);
        console.log("response while creating site", response);
        notifySuccess(response.message);
        navigate('/sites');
      } catch (errors) {
        console.log('Error:', errors.response.data.error);
        notifyError(errors.response.data.error)
      } finally {
        setBusy(false);
      }
    },
  });

  return (
    <Card sx={{ padding: 5 }}>
      <CardContent >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center" sx={{ fontSize: 30 }}>Create Site</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Site Name"
                name="site_name"
                id="site_name"
                type="text"
                value={formik.values.site_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.site_name && Boolean(formik.errors.site_name)}
                helperText={formik.touched.site_name && formik.errors.site_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Address"
                rows={3}
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="ZipCode"
                name="zipcode"
                id="zipcode"
                type="text"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="State"
                name="state"
                id="state"
                type="text"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Country"
                name="country"
                id="country"
                type="text"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" sx={{ mr: 2 }}
                onClick={() => { navigate('/sites') }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Create &nbsp;{busy && <CircularProgress color="warning" size={16} />}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
});

export const CreateSite = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 800 }}
      >
        <CreateSiteForm />
      </Box>
    </Box>
  )
}
