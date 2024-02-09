PGDMP  ,            	        |         	   detailing    16.0    16.0 R               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    36707 	   detailing    DATABASE     �   CREATE DATABASE detailing WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1251';
    DROP DATABASE detailing;
                postgres    false            h           1247    36773    enum_Appointments_status    TYPE     |   CREATE TYPE public."enum_Appointments_status" AS ENUM (
    'Pending',
    'Confirmed',
    'Completed',
    'Cancelled'
);
 -   DROP TYPE public."enum_Appointments_status";
       public          postgres    false            �            1259    36782    Appointments    TABLE     {  CREATE TABLE public."Appointments" (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    status public."enum_Appointments_status" DEFAULT 'Pending'::public."enum_Appointments_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    service_id integer,
    employee_id integer
);
 "   DROP TABLE public."Appointments";
       public         heap    postgres    false    872    872            �            1259    36781    Appointments_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Appointments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Appointments_id_seq";
       public          postgres    false    226                       0    0    Appointments_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Appointments_id_seq" OWNED BY public."Appointments".id;
          public          postgres    false    225            �            1259    36819    Assortments    TABLE       CREATE TABLE public."Assortments" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."Assortments";
       public         heap    postgres    false            �            1259    36818    Assortments_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Assortments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Assortments_id_seq";
       public          postgres    false    230                       0    0    Assortments_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Assortments_id_seq" OWNED BY public."Assortments".id;
          public          postgres    false    229            �            1259    36766 	   Employees    TABLE     7  CREATE TABLE public."Employees" (
    employee_id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    phone character varying(35),
    hourly_rate numeric(10,2),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Employees";
       public         heap    postgres    false            �            1259    36765    Employees_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Employees_employee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Employees_employee_id_seq";
       public          postgres    false    224                       0    0    Employees_employee_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Employees_employee_id_seq" OWNED BY public."Employees".employee_id;
          public          postgres    false    223            �            1259    36828 	   Favorites    TABLE     �   CREATE TABLE public."Favorites" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer,
    service_id integer
);
    DROP TABLE public."Favorites";
       public         heap    postgres    false            �            1259    36827    Favorites_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Favorites_id_seq";
       public          postgres    false    232                       0    0    Favorites_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Favorites_id_seq" OWNED BY public."Favorites".id;
          public          postgres    false    231            �            1259    36747    Reviews    TABLE       CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    service_id integer NOT NULL,
    user_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Reviews";
       public         heap    postgres    false            �            1259    36746    Reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Reviews_id_seq";
       public          postgres    false    222                       0    0    Reviews_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;
          public          postgres    false    221            �            1259    36722    ServiceCategories    TABLE     �   CREATE TABLE public."ServiceCategories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."ServiceCategories";
       public         heap    postgres    false            �            1259    36721    ServiceCategories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ServiceCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."ServiceCategories_id_seq";
       public          postgres    false    218                        0    0    ServiceCategories_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."ServiceCategories_id_seq" OWNED BY public."ServiceCategories".id;
          public          postgres    false    217            �            1259    36731    Services    TABLE     B  CREATE TABLE public."Services" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price double precision NOT NULL,
    image character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    category_id integer
);
    DROP TABLE public."Services";
       public         heap    postgres    false            �            1259    36730    Services_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Services_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Services_id_seq";
       public          postgres    false    220            !           0    0    Services_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Services_id_seq" OWNED BY public."Services".id;
          public          postgres    false    219            �            1259    36709    Users    TABLE     G  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    36708    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    216            "           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    215            �            1259    36805    Vehicles    TABLE       CREATE TABLE public."Vehicles" (
    id integer NOT NULL,
    make character varying(255) NOT NULL,
    model character varying(255) NOT NULL,
    year integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    user_id integer
);
    DROP TABLE public."Vehicles";
       public         heap    postgres    false            �            1259    36804    Vehicles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Vehicles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Vehicles_id_seq";
       public          postgres    false    228            #           0    0    Vehicles_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Vehicles_id_seq" OWNED BY public."Vehicles".id;
          public          postgres    false    227            J           2604    36785    Appointments id    DEFAULT     v   ALTER TABLE ONLY public."Appointments" ALTER COLUMN id SET DEFAULT nextval('public."Appointments_id_seq"'::regclass);
 @   ALTER TABLE public."Appointments" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            M           2604    36822    Assortments id    DEFAULT     t   ALTER TABLE ONLY public."Assortments" ALTER COLUMN id SET DEFAULT nextval('public."Assortments_id_seq"'::regclass);
 ?   ALTER TABLE public."Assortments" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            I           2604    36769    Employees employee_id    DEFAULT     �   ALTER TABLE ONLY public."Employees" ALTER COLUMN employee_id SET DEFAULT nextval('public."Employees_employee_id_seq"'::regclass);
 F   ALTER TABLE public."Employees" ALTER COLUMN employee_id DROP DEFAULT;
       public          postgres    false    223    224    224            N           2604    36831    Favorites id    DEFAULT     p   ALTER TABLE ONLY public."Favorites" ALTER COLUMN id SET DEFAULT nextval('public."Favorites_id_seq"'::regclass);
 =   ALTER TABLE public."Favorites" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            H           2604    36750 
   Reviews id    DEFAULT     l   ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);
 ;   ALTER TABLE public."Reviews" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            F           2604    36725    ServiceCategories id    DEFAULT     �   ALTER TABLE ONLY public."ServiceCategories" ALTER COLUMN id SET DEFAULT nextval('public."ServiceCategories_id_seq"'::regclass);
 E   ALTER TABLE public."ServiceCategories" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            G           2604    36734    Services id    DEFAULT     n   ALTER TABLE ONLY public."Services" ALTER COLUMN id SET DEFAULT nextval('public."Services_id_seq"'::regclass);
 <   ALTER TABLE public."Services" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            E           2604    36712    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            L           2604    36808    Vehicles id    DEFAULT     n   ALTER TABLE ONLY public."Vehicles" ALTER COLUMN id SET DEFAULT nextval('public."Vehicles_id_seq"'::regclass);
 <   ALTER TABLE public."Vehicles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228                      0    36782    Appointments 
   TABLE DATA           v   COPY public."Appointments" (id, date, status, "createdAt", "updatedAt", user_id, service_id, employee_id) FROM stdin;
    public          postgres    false    226   f                 0    36819    Assortments 
   TABLE DATA           _   COPY public."Assortments" (id, name, description, price, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   �f                 0    36766 	   Employees 
   TABLE DATA           w   COPY public."Employees" (employee_id, first_name, last_name, phone, hourly_rate, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224    i                 0    36828 	   Favorites 
   TABLE DATA           X   COPY public."Favorites" (id, "createdAt", "updatedAt", user_id, service_id) FROM stdin;
    public          postgres    false    232   �k       
          0    36747    Reviews 
   TABLE DATA           g   COPY public."Reviews" (id, service_id, user_id, rating, comment, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �k                 0    36722    ServiceCategories 
   TABLE DATA           Q   COPY public."ServiceCategories" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �r                 0    36731    Services 
   TABLE DATA           p   COPY public."Services" (id, name, description, price, image, "createdAt", "updatedAt", category_id) FROM stdin;
    public          postgres    false    220   �r                 0    36709    Users 
   TABLE DATA           `   COPY public."Users" (id, username, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �u                 0    36805    Vehicles 
   TABLE DATA           ^   COPY public."Vehicles" (id, make, model, year, "createdAt", "updatedAt", user_id) FROM stdin;
    public          postgres    false    228   �w       $           0    0    Appointments_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Appointments_id_seq"', 5, true);
          public          postgres    false    225            %           0    0    Assortments_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Assortments_id_seq"', 5, true);
          public          postgres    false    229            &           0    0    Employees_employee_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Employees_employee_id_seq"', 1, false);
          public          postgres    false    223            '           0    0    Favorites_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Favorites_id_seq"', 1, false);
          public          postgres    false    231            (           0    0    Reviews_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Reviews_id_seq"', 20, true);
          public          postgres    false    221            )           0    0    ServiceCategories_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."ServiceCategories_id_seq"', 1, false);
          public          postgres    false    217            *           0    0    Services_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Services_id_seq"', 1, false);
          public          postgres    false    219            +           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 12, true);
          public          postgres    false    215            ,           0    0    Vehicles_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Vehicles_id_seq"', 5, true);
          public          postgres    false    227            b           2606    36788    Appointments Appointments_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Appointments" DROP CONSTRAINT "Appointments_pkey";
       public            postgres    false    226            f           2606    36826    Assortments Assortments_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Assortments"
    ADD CONSTRAINT "Assortments_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Assortments" DROP CONSTRAINT "Assortments_pkey";
       public            postgres    false    230            `           2606    36771    Employees Employees_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."Employees"
    ADD CONSTRAINT "Employees_pkey" PRIMARY KEY (employee_id);
 F   ALTER TABLE ONLY public."Employees" DROP CONSTRAINT "Employees_pkey";
       public            postgres    false    224            h           2606    36833    Favorites Favorites_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Favorites" DROP CONSTRAINT "Favorites_pkey";
       public            postgres    false    232            j           2606    36835 *   Favorites Favorites_user_id_service_id_key 
   CONSTRAINT     x   ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_user_id_service_id_key" UNIQUE (user_id, service_id);
 X   ALTER TABLE ONLY public."Favorites" DROP CONSTRAINT "Favorites_user_id_service_id_key";
       public            postgres    false    232    232            ^           2606    36754    Reviews Reviews_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "Reviews_pkey";
       public            postgres    false    222            V           2606    36729 ,   ServiceCategories ServiceCategories_name_key 
   CONSTRAINT     k   ALTER TABLE ONLY public."ServiceCategories"
    ADD CONSTRAINT "ServiceCategories_name_key" UNIQUE (name);
 Z   ALTER TABLE ONLY public."ServiceCategories" DROP CONSTRAINT "ServiceCategories_name_key";
       public            postgres    false    218            X           2606    36727 (   ServiceCategories ServiceCategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."ServiceCategories"
    ADD CONSTRAINT "ServiceCategories_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."ServiceCategories" DROP CONSTRAINT "ServiceCategories_pkey";
       public            postgres    false    218            Z           2606    36740    Services Services_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_name_key" UNIQUE (name);
 H   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_name_key";
       public            postgres    false    220            \           2606    36738    Services Services_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_pkey";
       public            postgres    false    220            P           2606    36720    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    216            R           2606    36716    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    216            T           2606    36718    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            postgres    false    216            d           2606    36812    Vehicles Vehicles_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Vehicles"
    ADD CONSTRAINT "Vehicles_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Vehicles" DROP CONSTRAINT "Vehicles_pkey";
       public            postgres    false    228            n           2606    36799 *   Appointments Appointments_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES public."Employees"(employee_id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."Appointments" DROP CONSTRAINT "Appointments_employee_id_fkey";
       public          postgres    false    4704    224    226            o           2606    36794 )   Appointments Appointments_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."Appointments" DROP CONSTRAINT "Appointments_service_id_fkey";
       public          postgres    false    4700    226    220            p           2606    36789 &   Appointments Appointments_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."Appointments" DROP CONSTRAINT "Appointments_user_id_fkey";
       public          postgres    false    4690    226    216            r           2606    36841 #   Favorites Favorites_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Favorites" DROP CONSTRAINT "Favorites_service_id_fkey";
       public          postgres    false    220    232    4700            s           2606    36836     Favorites Favorites_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."Favorites" DROP CONSTRAINT "Favorites_user_id_fkey";
       public          postgres    false    232    4690    216            l           2606    36755    Reviews Reviews_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "Reviews_service_id_fkey";
       public          postgres    false    4700    220    222            m           2606    36760    Reviews Reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "Reviews_user_id_fkey";
       public          postgres    false    216    4690    222            k           2606    36741 "   Services Services_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."ServiceCategories"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_category_id_fkey";
       public          postgres    false    218    4696    220            q           2606    36813    Vehicles Vehicles_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vehicles"
    ADD CONSTRAINT "Vehicles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."Vehicles" DROP CONSTRAINT "Vehicles_user_id_fkey";
       public          postgres    false    4690    228    216               �   x���11���QNލ�K��J�A��E"�]EE��3�pTZPf���mɥ-'����?o�k��V�Ҁ��~��Μ	�<�g����<U�u�o�s~��O��葆@N�A�t�W�֦�|u�/�e�7Oo`�         R  x��S�n1�O_�}`BO+vg�I�Ā�q�#���%O��>C�E\�P��.wfvv՜Vn���!1yv�3�ԉ��IT���r=Ф�gǤ6d&Qjm���m�d��N6e.�v�?�)&7�2���-�J%D*j}�l���'��.�pd�l�����	P��߈�^L�ٛ��Y/�ۛ��fyG���������r��ź�#�Ҽ�>�D)$'�\pR!���O#�e�̱#o�~(�K���t���2򫀹��X����v}%�Ms
yh�Uz�#勚���)��x&g��6�3z:��)�r�k���(wUT�6�"�SH�����{ć����]���zʬA�L�፜��Z����֝!��@��U<�(Nm�. �4���m��`�8�y�r�6��͞r�CN�V��tೡ'��u{9��XE��\

`W]>=�6!���M2�K���Q�h��ԩ�b����0g�B��� ��\ �i�w��ݕ�wM�b	.7O�g�f�s�d����X�WUqd�T���6V#���������a�]|�!H��o���"Y㄰2Ԃl3���@:��7f���ϛY,y�j�         �  x���Ao�0��̯�1� A�(J�mm��m�^v�R5��8��l�~��;:�`@ ??����un�p]՛m[�,jB�]���ɂ|� '�2�L�`���g�5G�&~4����S�*u���jJY%�
9p��G�ux��;_��0��)�^�X�<N���̗�UӔ=L	�L~]9�Äр�Ҹ�B�(��v��|/�e����z����JD�� %��(ü�D�"��m�X��w�HT F}���ܿ������n���sa�Q�\�K������:��p��M?�hT�^������&Ipޖ�QVj�j�H�1�%ް@N��q�Q�������U�Ů�}��쭶�rґƕ�p�7�y]g��T� �q��*�D���4�P'R�`<�b�|$>�t`k;r>��y��zy��f�p����4�4c�-��%�R�4�ܔ��"�8�8l�} *��a�(q�Ʀ�2�($��x�����.p��-�mHު�A���9>t-�9��p^�yS5pUo��ϔ�Z�b�0`��e_�fSd�%f����m�<r"!Z�K�s]��QqrʑtH�*?$'�O�P�u�7�$m��S��^�7��pR�@��jK�k9 6*Y�ā�#�]z��Q���䛞L&�#��            x������ � �      
   �  x��W�r�6<��b�)oi��lGN��Pb�}�$�$� � ����R�}ȁ.��vI�GwO�txzx���1�^���'���i����l��>LIe��J=�bb�|#s����Z�����&Iu�*��r<\^\>}|q��⥜�^�N��=�����\~tYByz��k��%e�4{��ٸ��8��!֌��)���f�ަM��K�����ԵG��d�!Hc�������-�I���,&"��:�;��m�v�|oO��	i����x�����uտG�Vyg)�ʩwv�jn�g�,f�A�
��Z���c����̂G�ؼ^��Y��^hJhĴ��(7�P)���)"�yo:�$tk���wb���< 1�(�#/θ$����)���p��855��t"�
��Nu/�,�Zө�)�b���f������(Z<�j�� ���75�،�{�nuǳ j�.�z@�̚�u��f"��H�7�r��!' �����OH��:o[[� ��h�y$ �G��N�_M<k��xl��z���-!����oY�td�5�ʡ����&3�	蒿�Y�6��h+T y6H��8�btLl�@��
��<�ܛ�Ó���py��Ȕ��v`J�z	- LDR�Lx�rz@'j����΄Js�@�4��e
��S���aJ�����޸�7�s� �L�ju�Ι��y�j"oC����\��fm(~2H�c��ՠ��Z���	ژ��Q�A��A��.���"�&��y�P1P����
��5Ѣ�T!�	�qr�(ɴU���͂�Y[��'�Vliv7, �S�oXP��Tӂ��E0���f�� Lt��c^�:�V����Z�ߠu�X� B+*J$+��3C���|�/�S�s����!8���~5;����=+Nklۢ�Edפn �-kK������ȍB�@���-B�;�!�q�g�RZ��8N@��zT������1Kh������*p~�?��ؙX�Re�ݣ��Y���ךg*��WP����V�Y�l�Y7Qۋ��7-a��Uʥ��'�՗.�;�^	d�}m����������sy�L^���DJ��ZM�5E�~�딅dњh�s�H��{A
��8(��6�2=�4�v�!(F��Ն%xm�����,o_sޟ�S�rE��jg�"���	M��������LkCe�z�6ڪ�׎X�/L�ذ�)r~S2��80m��'��䰹0,9s���M�V�p���i4#�k�u�W�fʶ��m�U��qS�p�BŸ5��ߪ~�bYډ���R"6��hQ�m��fd�`��^�Y*�{X:6~�B5����=�z�W�a�uB
�o���)��l(ޣU���`����:��XV�"�'ӵ���E6KEv�M�g�7ŕ�����x&�N�9����`�>�&�L�Vlb�˨�؈��j�+��;�P�����n� �J5��J��w,}_�xVPT#�$��)�
�M��ߪ�� CJ�[Ty����0�aX��*�������~�(�z�	�`�`g0�����<N���D���X�i���νu��z�]q;��.��������:�����~*Δ[c���:�� ��+3M�����m�ܰ\��t�-��m�4+��h���������")��E�<�L��ֽDC������d[��Rk��o����y�k�T��s�1���?���=�q��q         X   x�3���/�L�4202�50�5�T0��24�25�60�!�e�Y\�X���G�>c΂����"��p&�&�T��ϔ371/1�d�b���� �:�         �  x���K��@�י_Q{�I&�I�N|� 
^AA:������Џ��==������ѩt���TW��⵳!��iс�"�T���/�����򲓻Z�Y�X�W��NW����(�ۏre��ȴi�g�ʻ�����Nq��*��43���g�RXDqlE[We[6�М��t*�*g�Q���\�c�<�,����zh�e���ñ����^<"�6b"˕��I�XݼCM#��N��IOg�"�r�1�tf6d%�H��l��O��Fi'�,��iu{K�)�q����*���< �,���-�Z��mY���wmw{|���P�VY�Ænr�j�3���5���XA+m.訝��%O*�R.�HA�Eo�ʡ�0`�+-��q�,Wgg�TO4��*�ϫ4i�
�HH�U�	�����ap	� u��n QܞÐYQ�(�㩭�c�5}����� ���o���S�`5�V�'�s�-DÕ:f.2@�;���� ����HУ�Q`�Q�&Gg�Ph!ݥ����E��.�m�:���y�����y���G6ES��*O�P7B5�4� �p!�;c�W4�d`�>y�Y�!K����U�hAox��IN��'/oZpFhOz� 2?�1�>���!�%��F�����*1���"�_ɺ|(�u3��D��?�@SvU�W����n�%��8�躉�         )  x���[o�0ǟͧ�TTML��� <AȠ@)�R
�4�$��8���O����eb��y�%���c���C�r*Q�'I(;�B━��=j��o��;�IH�t�Jӯ4G��6�m����8���#�S1�"DX�4%�Q����!C�Z����r��aL��4&Y� �2~�\"_$9��Q)I	U�$̓wH��Dc� �I��������p��v�����BDQz���R"�Q�����f��כZ%�������&��� "L�{F~{	�mog�*�W�V�%h�	�	WD��ע�"��\�ju����N��[�[���}�
�"ᄅ�]�le�j�hgV�� �W4�"#��	=���)����N��ȫ`pQ%�_�}���˄s�F����=�'��q�Ȱ��o��F'&����_׬�����X(6�H��C:�+ס}ˈ`>y�ϟ66����0H^�Z�Y�m9*��!\�0F�����[q6�y<�S|�5��n:��N�ּ�`=[~�Ҍ9��YJ�id����C1ڦ�:�yV��U��Z��~��`T         �   x���1� �W��b��4�����>)��c��f��h�+���E��)��� � �EN����W1��'T��'�5&>!�:GX�BR[�;5�m�?�{$NT):-�.~��~����ㆈ?|Gp     