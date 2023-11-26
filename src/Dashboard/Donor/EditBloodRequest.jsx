import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useBloodRequest from "../../Hooks/useBloodRequest";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';


const EditBloodRequest = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { id } = useParams();
    const [bloodRequest, loading, ]= useBloodRequest()

    if (loading) {
        console.log("Data is still loading. Please wait...");
        return;
    }

const singleData = bloodRequest.find(request => request._id === id)
console.log(singleData);

    // console.log(id);
    // console.log(bloodRequest);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            console.log("Data is still loading. Please wait...");
            return;
        }

      
        const updatedRecipientName = e.target.recipientName.value;
        const updatedDistrict = e.target.district.value;
        const updatedBloodGroup = e.target.bloodGroup.value
        const updatedUpazila = e.target.upazila.value;
        const updatedHospitalName = e.target.hospitalName.value;
        const updatedFullAddress = e.target.fullAddress.value;
        const updatedDonationDate = e.target.donationDate.value;
        const updatedDonationTime = e.target.donationTime.value;
        const updatedRequestMessage = e.target.requestMessage.value;
       

        const updatedBloodRequest = {
            
            recipientName: updatedRecipientName,
            district: updatedDistrict,
            bloodGroup: updatedBloodGroup,
            upazila: updatedUpazila,
            hospitalName: updatedHospitalName,
            fullAddress: updatedFullAddress,
            donationDate: updatedDonationDate,
            donationTime: updatedDonationTime,
            requestMessage: updatedRequestMessage,
           
        };

        const updatedBlood = await axiosPublic.patch(`/dashboard/donorDashboard/editBloodRequest/${singleData._id}`, updatedBloodRequest);
        console.log(updatedBlood.data)
        if (updatedBlood.data.modifiedCount > 0) {
            swal({
                title: 'Blood Request Updated',
                text: 'Blood Request updated successfully',
                icon: 'success'
            })
        }

    }


    return (

        <div>
            <div>
                <div className=''>
                    <h1 className="text-center text-4xl mt-10 mb-5">Update Donation Request</h1>
                    <div className="border-b-4 text-center w-56 mb-10 mx-auto border-black"></div>
                    <div className="flex lg:flex-row flex-col-reverse justify-center items-center my-10">
                        <div className="shadow-2xl hover:shadow-purple-600 rounded-md lg:w-1/2 mx-auto ">
                            <form onSubmit={handleFormSubmit} className=" rounded px-8 pt-6 pb-8 mb-4">

                                {/* requester name (read-only) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Requester Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        value={user.displayName}
                                        readOnly
                                        name="requesterName"
                                    />
                                </div>

                                {/* requester email (read-only) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Requester Email
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        name="requesterEmail"
                                    />
                                </div>

                                {/* recipient name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientName">
                                        Recipient Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="recipientName"
                                        type="text"
                                        placeholder="Recipient Name"
                                        required
                                        name="recipientName"
                                        defaultValue={singleData?.recipientName || ""}
                                    />
                                </div>

                                {/* recipient district (select option) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
                                        Recipient District
                                    </label>
                                    <select
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="district"
                                        name="district"
                                        defaultValue={singleData?.district || ""}
                                    >
                                        <option disabled value="default">Select a District</option>
                                        <option value="Cumilla">Cumilla</option>
<option value="Feni">Feni</option>
<option value="Brahmanbaria">Brahmanbaria</option>
<option value="Rangamati">Rangamati</option>
<option value="Noakhali">Noakhali</option>
<option value="Chandpur">Chandpur</option>
<option value="Lakshmipur">Lakshmipur</option>
<option value="Chattogram">Chattogram</option>
<option value="Coxsbazar">Coxsbazar</option>
<option value="Khagrachhari">Khagrachhari</option>
<option value="Bandarban">Bandarban</option>
<option value="Sirajganj">Sirajganj</option>
<option value="Pabna">Pabna</option>
<option value="Bogura">Bogura</option>
<option value="Rajshahi">Rajshahi</option>
<option value="Natore">Natore</option>
<option value="Joypurhat">Joypurhat</option>
<option value="Chapainawabganj">Chapainawabganj</option>
<option value="Naogaon">Naogaon</option>
<option value="Jashore">Jashore</option>
<option value="Satkhira">Satkhira</option>
<option value="Meherpur">Meherpur</option>
<option value="Narail">Narail</option>
<option value="Chuadanga">Chuadanga</option>
<option value="Kushtia">Kushtia</option>
<option value="Magura">Magura</option>
<option value="Khulna">Khulna</option>
<option value="Bagerhat">Bagerhat</option>
<option value="Jhenaidah">Jhenaidah</option>
<option value="Jhalakathi">Jhalakathi</option>
<option value="Patuakhali">Patuakhali</option>
<option value="Pirojpur">Pirojpur</option>
<option value="Barisal">Barisal</option>
<option value="Bhola">Bhola</option>
<option value="Barguna">Barguna</option>
<option value="Sylhet">Sylhet</option>
<option value="Moulvibazar">Moulvibazar</option>
<option value="Habiganj">Habiganj</option>
<option value="Sunamganj">Sunamganj</option>
<option value="Narsingdi">Narsingdi</option>
<option value="Gazipur">Gazipur</option>
<option value="Shariatpur">Shariatpur</option>
<option value="Narayanganj">Narayanganj</option>
<option value="Tangail">Tangail</option>
<option value="Kishoreganj">Kishoreganj</option>
<option value="Manikganj">Manikganj</option>
<option value="Dhaka">Dhaka</option>
<option value="Munshiganj">Munshiganj</option>
<option value="Rajbari">Rajbari</option>
<option value="Madaripur">Madaripur</option>
<option value="Gopalganj">Gopalganj</option>
<option value="Faridpur">Faridpur</option>
<option value="Panchagarh">Panchagarh</option>
<option value="Dinajpur">Dinajpur</option>
<option value="Lalmonirhat">Lalmonirhat</option>
<option value="Nilphamari">Nilphamari</option>
<option value="Gaibandha">Gaibandha</option>
<option value="Thakurgaon">Thakurgaon</option>
<option value="Rangpur">Rangpur</option>
<option value="Kurigram">Kurigram</option>
<option value="Sherpur">Sherpur</option>
<option value="Mymensingh">Mymensingh</option>
<option value="Jamalpur">Jamalpur</option>
<option value="Netrokona">Netrokona</option>
                                    </select>
                                </div>

                                {/* recipient blood Group (select option) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                                        Recipient Blood Group
                                    </label>
                                    <select
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        defaultValue={singleData?.bloodGroup || ""}
                                    >
                                        <option disabled value="default">Select a Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                {/* recipient upazila (select option) */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upazila">
                                        Recipient Upazila
                                    </label>
                                    <select
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="upazila"
                                        name="upazila"
                                        defaultValue={singleData?.upazila || ""}
                                    >
                                        <option disabled value="default">Select a Upazila</option>
                                        <option value="Debidwar">Debidwar</option>
<option value="Barura">Barura</option>
<option value="Brahmanpara">Brahmanpara</option>
<option value="Chandina">Chandina</option>
<option value="Chauddagram">Chauddagram</option>
<option value="Daudkandi">Daudkandi</option>
<option value="Homna">Homna</option>
<option value="Laksam">Laksam</option>
<option value="Muradnagar">Muradnagar</option>
<option value="Nangalkot">Nangalkot</option>
<option value="Comilla Sadar">Comilla Sadar</option>
<option value="Meghna">Meghna</option>
<option value="Monohargonj">Monohargonj</option>
<option value="Sadarsouth">Sadarsouth</option>
<option value="Titas">Titas</option>
<option value="Burichang">Burichang</option>
<option value="Lalmai">Lalmai</option>
<option value="Chhagalnaiya">Chhagalnaiya</option>
<option value="Feni Sadar">Feni Sadar</option>
<option value="Sonagazi">Sonagazi</option>
<option value="Fulgazi">Fulgazi</option>
<option value="Parshuram">Parshuram</option>
<option value="Daganbhuiyan">Daganbhuiyan</option>
<option value="Brahmanbaria Sadar">Brahmanbaria Sadar</option>
<option value="Kasba">Kasba</option>
<option value="Nasirnagar">Nasirnagar</option>
<option value="Sarail">Sarail</option>
<option value="Ashuganj">Ashuganj</option>
<option value="Akhaura">Akhaura</option>
<option value="Nabinagar">Nabinagar</option>
<option value="Bancharampur">Bancharampur</option>
<option value="Bijoynagar">Bijoynagar</option>
<option value="Rangamati Sadar">Rangamati Sadar</option>
<option value="Kaptai">Kaptai</option>
<option value="Kawkhali">Kawkhali</option>
<option value="Baghaichari">Baghaichari</option>
<option value="Barkal">Barkal</option>
<option value="Langadu">Langadu</option>
<option value="Rajasthali">Rajasthali</option>
<option value="Belaichari">Belaichari</option>
<option value="Juraichari">Juraichari</option>
<option value="Naniarchar">Naniarchar</option>
<option value="Noakhali Sadar">Noakhali Sadar</option>
<option value="Companiganj">Companiganj</option>
<option value="Begumganj">Begumganj</option>
<option value="Hatia">Hatia</option>
<option value="Subarnachar">Subarnachar</option>
<option value="Kabirhat">Kabirhat</option>
<option value="Senbug">Senbug</option>
<option value="Chatkhil">Chatkhil</option>
<option value="Sonaimori">Sonaimori</option>
<option value="Haimchar">Haimchar</option>
<option value="Kachua">Kachua</option>
<option value="Shahrasti">Shahrasti</option>
<option value="Chandpur Sadar">Chandpur Sadar</option>
<option value="Matlab South">Matlab South</option>
<option value="Hajiganj">Hajiganj</option>
<option value="Matlab North">Matlab North</option>
<option value="Faridgonj">Faridgonj</option>
<option value="Lakshmipur Sadar">Lakshmipur Sadar</option>
<option value="Kamalnagar">Kamalnagar</option>
<option value="Raipur">Raipur</option>
<option value="Ramgati">Ramgati</option>
<option value="Ramganj">Ramganj</option>
<option value="Rangunia">Rangunia</option>
<option value="Sitakunda">Sitakunda</option>
<option value="Mirsharai">Mirsharai</option>
<option value="Patiya">Patiya</option>
<option value="Sandwip">Sandwip</option>
<option value="Banshkhali">Banshkhali</option>
<option value="Boalkhali">Boalkhali</option>
<option value="Anwara">Anwara</option>
<option value="Chandanaish">Chandanaish</option>
<option value="Satkania">Satkania</option>
<option value="Lohagara">Lohagara</option>
<option value="Hathazari">Hathazari</option>
<option value="Fatikchhari">Fatikchhari</option>
<option value="Raozan">Raozan</option>
<option value="Karnafuli">Karnafuli</option>
<option value="Coxsbazar Sadar">Coxsbazar Sadar</option>
<option value="Chakaria">Chakaria</option>
<option value="Kutubdia">Kutubdia</option>
<option value="Ukhiya">Ukhiya</option>
<option value="Moheshkhali">Moheshkhali</option>
<option value="Pekua">Pekua</option>
<option value="Ramu">Ramu</option>
<option value="Teknaf">Teknaf</option>
<option value="Khagrachhari Sadar">Khagrachhari Sadar</option>
<option value="Dighinala">Dighinala</option>
<option value="Panchari">Panchari</option>
<option value="Laxmichhari">Laxmichhari</option>
<option value="Mohalchari">Mohalchari</option>
<option value="Manikchari">Manikchari</option>
<option value="Ramgarh">Ramgarh</option>
<option value="Matiranga">Matiranga</option>
<option value="Guimara">Guimara</option>
<option value="Bandarban Sadar">Bandarban Sadar</option>
<option value="Alikadam">Alikadam</option>
<option value="Naikhongchhari">Naikhongchhari</option>
<option value="Rowangchhari">Rowangchhari</option>
<option value="Lama">Lama</option>
<option value="Ruma">Ruma</option>
<option value="Thanchi">Thanchi</option>
<option value="Belkuchi">Belkuchi</option>
<option value="Chauhali">Chauhali</option>
<option value="Kamarkhand">Kamarkhand</option>
<option value="Kazipur">Kazipur</option>
<option value="Raigonj">Raigonj</option>
<option value="Shahjadpur">Shahjadpur</option>
<option value="Sirajganj Sadar">Sirajganj Sadar</option>
<option value="Tarash">Tarash</option>
<option value="Ullapara">Ullapara</option>
<option value="Sujanagar">Sujanagar</option>
<option value="Ishurdi">Ishurdi</option>
<option value="Bhangura">Bhangura</option>
<option value="Pabna Sadar">Pabna Sadar</option>
<option value="Bera">Bera</option>
<option value="Atghoria">Atghoria</option>
<option value="Chatmohar">Chatmohar</option>
<option value="Santhia">Santhia</option>
<option value="Faridpur">Faridpur</option>
<option value="Kahaloo">Kahaloo</option>
<option value="Bogra Sadar">Bogra Sadar</option>
<option value="Shariakandi">Shariakandi</option>
<option value="Shajahanpur">Shajahanpur</option>
<option value="Dupchanchia">Dupchanchia</option>
<option value="Adamdighi">Adamdighi</option>
<option value="Nondigram">Nondigram</option>
<option value="Sonatala">Sonatala</option>
<option value="Dhunot">Dhunot</option>
<option value="Gabtali">Gabtali</option>
<option value="Sherpur">Sherpur</option>
<option value="Shibganj">Shibganj</option>
<option value="Paba">Paba</option>
<option value="Durgapur">Durgapur</option>
<option value="Mohonpur">Mohonpur</option>
<option value="Charghat">Charghat</option>
<option value="Puthia">Puthia</option>
<option value="Bagha">Bagha</option>
<option value="Godagari">Godagari</option>
<option value="Tanore">Tanore</option>
<option value="Bagmara">Bagmara</option>
<option value="Natore Sadar">Natore Sadar</option>
<option value="Singra">Singra</option>
<option value="Baraigram">Baraigram</option>
<option value="Bagatipara">Bagatipara</option>
<option value="Lalpur">Lalpur</option>
<option value="Gurudaspur">Gurudaspur</option>
<option value="Naldanga">Naldanga</option>
<option value="Akkelpur">Akkelpur</option>
<option value="Kalai">Kalai</option>
<option value="Khetlal">Khetlal</option>
<option value="Panchbibi">Panchbibi</option>
<option value="Joypurhat Sadar">Joypurhat Sadar</option>
<option value="Chapainawabganj Sadar">Chapainawabganj Sadar</option>
<option value="Gomostapur">Gomostapur</option>
<option value="Nachol">Nachol</option>
<option value="Bholahat">Bholahat</option>
<option value="Shibganj">Shibganj</option>
<option value="Mohadevpur">Mohadevpur</option>
<option value="Badalgachi">Badalgachi</option>
<option value="Patnitala">Patnitala</option>
<option value="Dhamoirhat">Dhamoirhat</option>
<option value="Niamatpur">Niamatpur</option>
<option value="Manda">Manda</option>
<option value="Atrai">Atrai</option>
<option value="Raninagar">Raninagar</option>
<option value="Naogaon Sadar">Naogaon Sadar</option>
<option value="Porsha">Porsha</option>
<option value="Sapahar">Sapahar</option>
<option value="Manirampur">Manirampur</option>
<option value="Abhaynagar">Abhaynagar</option>
<option value="Bagherpara">Bagherpara</option>
<option value="Chougachha">Chougachha</option>
<option value="Jhikargacha">Jhikargacha</option>
<option value="Keshabpur">Keshabpur</option>
<option value="Jessore Sadar">Jessore Sadar</option>
<option value="Sharsha">Sharsha</option>
<option value="Assasuni">Assasuni</option>
<option value="Debhata">Debhata</option>
<option value="Kalaroa">Kalaroa</option>
<option value="Satkhira Sadar">Satkhira Sadar</option>
<option value="Shyamnagar">Shyamnagar</option>
<option value="Tala">Tala</option>
<option value="Kaliganj">Kaliganj</option>
<option value="Mujibnagar">Mujibnagar</option>
<option value="Meherpur Sadar">Meherpur Sadar</option>
<option value="Gangni">Gangni</option>
<option value="Narail Sadar">Narail Sadar</option>
<option value="Lohagara">Lohagara</option>
<option value="Kalia">Kalia</option>
<option value="Chuadanga Sadar">Chuadanga Sadar</option>
<option value="Alamdanga">Alamdanga</option>
<option value="Damurhuda">Damurhuda</option>
<option value="Jibannagar">Jibannagar</option>
<option value="Kushtia Sadar">Kushtia Sadar</option>
<option value="Kumarkhali">Kumarkhali</option>
<option value="Khoksa">Khoksa</option>
<option value="Mirpur">Mirpur</option>
<option value="Daulatpur">Daulatpur</option>
<option value="Bheramara">Bheramara</option>
<option value="Shalikha">Shalikha</option>
<option value="Sreepur">Sreepur</option>
<option value="Magura Sadar">Magura Sadar</option>
<option value="Mohammadpur">Mohammadpur</option>
<option value="Paikgasa">Paikgasa</option>
<option value="Fultola">Fultola</option>
<option value="Digholia">Digholia</option>
<option value="Rupsha">Rupsha</option>
<option value="Terokhada">Terokhada</option>
<option value="Dumuria">Dumuria</option>
<option value="Botiaghata">Botiaghata</option>
<option value="Dakop">Dakop</option>
<option value="Koyra">Koyra</option>
<option value="Fakirhat">Fakirhat</option>
<option value="Bagerhat Sadar">Bagerhat Sadar</option>
<option value="Mollahat">Mollahat</option>
<option value="Sarankhola">Sarankhola</option>
<option value="Rampal">Rampal</option>
<option value="Morrelganj">Morrelganj</option>
<option value="Kachua">Kachua</option>
<option value="Mongla">Mongla</option>
<option value="Chitalmari">Chitalmari</option>
<option value="Jhenaidah Sadar">Jhenaidah Sadar</option>
<option value="Shailkupa">Shailkupa</option>
<option value="Harinakundu">Harinakundu</option>
<option value="Kaliganj">Kaliganj</option>
<option value="Kotchandpur">Kotchandpur</option>
<option value="Moheshpur">Moheshpur</option>
<option value="Jhalakathi Sadar">Jhalakathi Sadar</option>
<option value="Kathalia">Kathalia</option>
<option value="Nalchity">Nalchity</option>
<option value="Rajapur">Rajapur</option>
<option value="Bauphal">Bauphal</option>
<option value="Patuakhali Sadar">Patuakhali Sadar</option>
<option value="Dumki">Dumki</option>
<option value="Dashmina">Dashmina</option>
<option value="Kalapara">Kalapara</option>
<option value="Mirzaganj">Mirzaganj</option>
<option value="Galachipa">Galachipa</option>
<option value="Rangabali">Rangabali</option>
<option value="Pirojpur Sadar">Pirojpur Sadar</option>
<option value="Nazirpur">Nazirpur</option>
<option value="Kawkhali">Kawkhali</option>
<option value="Zianagar">Zianagar</option>
<option value="Bhandaria">Bhandaria</option>
<option value="Mathbaria">Mathbaria</option>
<option value="Nesarabad">Nesarabad</option>
<option value="Barisal Sadar">Barisal Sadar</option>
<option value="Bakerganj">Bakerganj</option>
<option value="Babuganj">Babuganj</option>
<option value="Wazirpur">Wazirpur</option>
<option value="Banaripara">Banaripara</option>
<option value="Gournadi">Gournadi</option>
<option value="Agailjhara">Agailjhara</option>
<option value="Mehendiganj">Mehendiganj</option>
<option value="Muladi">Muladi</option>
<option value="Hizla">Hizla</option>
<option value="Bhola Sadar">Bhola Sadar</option>
<option value="Borhan Sddin">Borhan Sddin</option>
<option value="Charfesson">Charfesson</option>
<option value="Doulatkhan">Doulatkhan</option>
<option value="Monpura">Monpura</option>
<option value="Tazumuddin">Tazumuddin</option>
<option value="Lalmohan">Lalmohan</option>
<option value="Amtali">Amtali</option>
<option value="Barguna Sadar">Barguna Sadar</option>
<option value="Betagi">Betagi</option>
<option value="Bamna">Bamna</option>
<option value="Pathorghata">Pathorghata</option>
<option value="Taltali">Taltali</option>
<option value="Balaganj">Balaganj</option>
<option value="Beanibazar">Beanibazar</option>
<option value="Bishwanath">Bishwanath</option>
<option value="Companiganj">Companiganj</option>
<option value="Fenchuganj">Fenchuganj</option>
<option value="Golapganj">Golapganj</option>
<option value="Gowainghat">Gowainghat</option>
<option value="Jaintiapur">Jaintiapur</option>
<option value="Kanaighat">Kanaighat</option>
<option value="Sylhet Sadar">Sylhet Sadar</option>
<option value="Zakiganj">Zakiganj</option>
<option value="Dakshinsurma">Dakshinsurma</option>
<option value="Osmaninagar">Osmaninagar</option>
<option value="Barlekha">Barlekha</option>
<option value="Kamolganj">Kamolganj</option>
<option value="Kulaura">Kulaura</option>
<option value="Moulvibazar Sadar">Moulvibazar Sadar</option>
<option value="Rajnagar">Rajnagar</option>
<option value="Sreemangal">Sreemangal</option>
<option value="Juri">Juri</option>
<option value="Nabiganj">Nabiganj</option>
<option value="Bahubal">Bahubal</option>
<option value="Ajmiriganj">Ajmiriganj</option>
<option value="Baniachong">Baniachong</option>
<option value="Lakhai">Lakhai</option>
<option value="Chunarughat">Chunarughat</option>
<option value="Habiganj Sadar">Habiganj Sadar</option>
<option value="Madhabpur">Madhabpur</option>
<option value="Sunamganj Sadar">Sunamganj Sadar</option>
<option value="South Sunamganj">South Sunamganj</option>
<option value="Bishwambarpur">Bishwambarpur</option>
<option value="Chhatak">Chhatak</option>
<option value="Jagannathpur">Jagannathpur</option>
<option value="Dowarabazar">Dowarabazar</option>
<option value="Tahirpur">Tahirpur</option>
<option value="Dharmapasha">Dharmapasha</option>
<option value="Jamalganj">Jamalganj</option>
<option value="Shalla">Shalla</option>
<option value="Derai">Derai</option>
<option value="Belabo">Belabo</option>
<option value="Monohardi">Monohardi</option>
<option value="Narsingdi Sadar">Narsingdi Sadar</option>
<option value="Palash">Palash</option>
<option value="Raipura">Raipura</option>
<option value="Shibpur">Shibpur</option>
<option value="Kaliganj">Kaliganj</option>
<option value="Kaliakair">Kaliakair</option>
<option value="Kapasia">Kapasia</option>
<option value="Gazipur Sadar">Gazipur Sadar</option>
<option value="Sreepur">Sreepur</option>
<option value="Shariatpur Sadar">Shariatpur Sadar</option>
<option value="Naria">Naria</option>
<option value="Zajira">Zajira</option>
<option value="Gosairhat">Gosairhat</option>
<option value="Bhedarganj">Bhedarganj</option>
<option value="Damudya">Damudya</option>
<option value="Araihazar">Araihazar</option>
<option value="Bandar">Bandar</option>
<option value="Narayanganj Sadar">Narayanganj Sadar</option>
<option value="Rupganj">Rupganj</option>
<option value="Sonargaon">Sonargaon</option>
<option value="Basail">Basail</option>
<option value="Bhuapur">Bhuapur</option>
<option value="Delduar">Delduar</option>
<option value="Ghatail">Ghatail</option>
<option value="Gopalpur">Gopalpur</option>
<option value="Madhupur">Madhupur</option>
<option value="Mirzapur">Mirzapur</option>
<option value="Nagarpur">Nagarpur</option>
<option value="Sakhipur">Sakhipur</option>
<option value="Tangail Sadar">Tangail Sadar</option>
<option value="Kalihati">Kalihati</option>
<option value="Dhanbari">Dhanbari</option>
<option value="Itna">Itna</option>
<option value="Katiadi">Katiadi</option>
<option value="Bhairab">Bhairab</option>
<option value="Tarail">Tarail</option>
<option value="Hossainpur">Hossainpur</option>
<option value="Pakundia">Pakundia</option>
<option value="Kuliarchar">Kuliarchar</option>
<option value="Kishoreganj Sadar">Kishoreganj Sadar</option>
<option value="Karimgonj">Karimgonj</option>
<option value="Bajitpur">Bajitpur</option>
<option value="Austagram">Austagram</option>
<option value="Mithamoin">Mithamoin</option>
<option value="Nikli">Nikli</option>
<option value="Harirampur">Harirampur</option>
<option value="Saturia">Saturia</option>
<option value="Manikganj Sadar">Manikganj Sadar</option>
<option value="Gior">Gior</option>
<option value="Shibaloy">Shibaloy</option>
<option value="Doulatpur">Doulatpur</option>
<option value="Singiar">Singiar</option>
<option value="Savar">Savar</option>
<option value="Dhamrai">Dhamrai</option>
<option value="Keraniganj">Keraniganj</option>
<option value="Nawabganj">Nawabganj</option>
<option value="Dohar">Dohar</option>
<option value="Munshiganj Sadar">Munshiganj Sadar</option>
<option value="Sreenagar">Sreenagar</option>
<option value="Sirajdikhan">Sirajdikhan</option>
<option value="Louhajanj">Louhajanj</option>
<option value="Gajaria">Gajaria</option>
<option value="Tongibari">Tongibari</option>
<option value="Rajbari Sadar">Rajbari Sadar</option>
<option value="Goalanda">Goalanda</option>
<option value="Pangsa">Pangsa</option>
<option value="Baliakandi">Baliakandi</option>
<option value="Kalukhali">Kalukhali</option>
<option value="Madaripur Sadar">Madaripur Sadar</option>
<option value="Shibchar">Shibchar</option>
<option value="Kalkini">Kalkini</option>
<option value="Rajoir">Rajoir</option>
<option value="Gopalganj Sadar">Gopalganj Sadar</option>
<option value="Kashiani">Kashiani</option>
<option value="Tungipara">Tungipara</option>
<option value="Kotalipara">Kotalipara</option>
<option value="Muksudpur">Muksudpur</option>
<option value="Faridpur Sadar">Faridpur Sadar</option>
<option value="Alfadanga">Alfadanga</option>
<option value="Boalmari">Boalmari</option>
<option value="Sadarpur">Sadarpur</option>
<option value="Nagarkanda">Nagarkanda</option>
<option value="Bhanga">Bhanga</option>
<option value="Charbhadrasan">Charbhadrasan</option>
<option value="Madhukhali">Madhukhali</option>
<option value="Saltha">Saltha</option>
<option value="Panchagarh Sadar">Panchagarh Sadar</option>
<option value="Debiganj">Debiganj</option>
<option value="Boda">Boda</option>
<option value="Atwari">Atwari</option>
<option value="Tetulia">Tetulia</option>
<option value="Nawabganj">Nawabganj</option>
<option value="Birganj">Birganj</option>
<option value="Ghoraghat">Ghoraghat</option>
<option value="Birampur">Birampur</option>
<option value="Parbatipur">Parbatipur</option>
<option value="Bochaganj">Bochaganj</option>
<option value="Kaharol">Kaharol</option>
<option value="Fulbari">Fulbari</option>
<option value="Dinajpur Sadar">Dinajpur Sadar</option>
<option value="Hakimpur">Hakimpur</option>
<option value="Khansama">Khansama</option>
<option value="Birol">Birol</option>
<option value="Chirirbandar">Chirirbandar</option>
<option value="Lalmonirhat Sadar">Lalmonirhat Sadar</option>
<option value="Kaliganj">Kaliganj</option>
<option value="Hatibandha">Hatibandha</option>
<option value="Patgram">Patgram</option>
<option value="Aditmari">Aditmari</option>
<option value="Syedpur">Syedpur</option>
<option value="Domar">Domar</option>
<option value="Dimla">Dimla</option>
<option value="Jaldhaka">Jaldhaka</option>
<option value="Kishorganj">Kishorganj</option>
<option value="Nilphamari Sadar">Nilphamari Sadar</option>
<option value="Sadullapur">Sadullapur</option>
<option value="Gaibandha Sadar">Gaibandha Sadar</option>
<option value="Palashbari">Palashbari</option>
<option value="Saghata">Saghata</option>
<option value="Gobindaganj">Gobindaganj</option>
<option value="Sundarganj">Sundarganj</option>
<option value="Phulchari">Phulchari</option>
<option value="Thakurgaon Sadar">Thakurgaon Sadar</option>
<option value="Pirganj">Pirganj</option>
<option value="Ranisankail">Ranisankail</option>
<option value="Haripur">Haripur</option>
<option value="Baliadangi">Baliadangi</option>
<option value="Rangpur Sadar">Rangpur Sadar</option>
<option value="Gangachara">Gangachara</option>
<option value="Taragonj">Taragonj</option>
<option value="Badargonj">Badargonj</option>
<option value="Mithapukur">Mithapukur</option>
<option value="Pirgonj">Pirgonj</option>
<option value="Kaunia">Kaunia</option>
<option value="Pirgacha">Pirgacha</option>
<option value="Kurigram Sadar">Kurigram Sadar</option>
<option value="Nageshwari">Nageshwari</option>
<option value="Bhurungamari">Bhurungamari</option>
<option value="Phulbari">Phulbari</option>
<option value="Rajarhat">Rajarhat</option>
<option value="Ulipur">Ulipur</option>
<option value="Chilmari">Chilmari</option>
<option value="Rowmari">Rowmari</option>
<option value="Charrajibpur">Charrajibpur</option>
<option value="Sherpur Sadar">Sherpur Sadar</option>
<option value="Nalitabari">Nalitabari</option>
<option value="Sreebordi">Sreebordi</option>
<option value="Nokla">Nokla</option>
<option value="Jhenaigati">Jhenaigati</option>
<option value="Fulbaria">Fulbaria</option>
<option value="Trishal">Trishal</option>
<option value="Bhaluka">Bhaluka</option>
<option value="Muktagacha">Muktagacha</option>
<option value="Mymensingh Sadar">Mymensingh Sadar</option>
<option value="Dhobaura">Dhobaura</option>
<option value="Phulpur">Phulpur</option>
<option value="Haluaghat">Haluaghat</option>
<option value="Gouripur">Gouripur</option>
<option value="Gafargaon">Gafargaon</option>
<option value="Iswarganj">Iswarganj</option>
<option value="Nandail">Nandail</option>
<option value="Tarakanda">Tarakanda</option>
<option value="Jamalpur Sadar">Jamalpur Sadar</option>
<option value="Melandah">Melandah</option>
<option value="Islampur">Islampur</option>
<option value="Dewangonj">Dewangonj</option>
<option value="Sarishabari">Sarishabari</option>
<option value="Madarganj">Madarganj</option>
<option value="Bokshiganj">Bokshiganj</option>
<option value="Barhatta">Barhatta</option>
<option value="Durgapur">Durgapur</option>
<option value="Kendua">Kendua</option>
<option value="Atpara">Atpara</option>
<option value="Madan">Madan</option>
<option value="Khaliajuri">Khaliajuri</option>
<option value="Kalmakanda">Kalmakanda</option>
<option value="Mohongonj">Mohongonj</option>
<option value="Purbadhala">Purbadhala</option>
<option value="Netrokona Sadar">Netrokona Sadar</option>
<option value="Eidgaon">Eidgaon</option>
<option value="Madhyanagar">Madhyanagar</option>
<option value="Dasar">Dasar</option>
                                    </select>
                                </div>

                                {/* hospital name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospitalName">
                                        Hospital Name
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="hospitalName"
                                        type="text"
                                        placeholder="Hospital Name"
                                        required
                                        name="hospitalName"
                                        defaultValue={singleData?.hospitalName || ""}
                                    />
                                </div>

                                {/* full address line */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullAddress">
                                        Full Address Line
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="fullAddress"
                                        type="text"
                                        placeholder="Full Address Line"
                                        required
                                        name="fullAddress"
                                        defaultValue={singleData?.fullAddress || ""}
                                    />
                                </div>

                                {/* donation date */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationDate">
                                        Donation Date
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationDate"
                                        type="date"
                                        required
                                        name="donationDate"
                                        defaultValue={singleData?.donationDate || ""}
                                    />
                                </div>

                                {/* donation time */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationTime">
                                        Donation Time
                                    </label>
                                    <input
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="donationTime"
                                        type="time"
                                        required
                                        name="donationTime"
                                        defaultValue={singleData?.donationTime || ""}
                                    />
                                </div>

                                {/* request message */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestMessage">
                                        Request Message
                                    </label>
                                    <textarea
                                        className="shadow border-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="requestMessage"
                                        placeholder="Request Message"
                                        required
                                        name="requestMessage"
                                        defaultValue={singleData?.requestMessage || ""}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        className="btn btn-sm rounded-md border-black hover:bg-black hover:text-white bg-none text-black"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBloodRequest;