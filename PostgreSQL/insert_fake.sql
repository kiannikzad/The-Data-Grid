/* Add location and community for UCLA (generic)*/

INSERT INTO item_point
	(point_id, longitude, latitude)
	VALUES (DEFAULT, 34.068445, -118.442225);

INSERT INTO loc
	(location_id, point_id)
	VALUES (DEFAULT, currval('item_point_point_id_seq'));

INSERT INTO item_community
	(community_id, community_name, city, state, country, location_id)
	VALUES (DEFAULT, 'UCLA', 'Los Angeles', 'California', 'United States of America', currval('loc_location_id_seq'));

/* Add additional location types */

INSERT INTO item_building
	(building_id, community_id, building_name, location_id)
	VALUES (DEFAULT, currval('item_community_community_id_seq'), 'Boelter Hall', currval('loc_location_id_seq'));

INSERT INTO item_room
	(room_id, room_number, building_id)
	VALUES (DEFAULT, 5420, currval('item_building_building_id_seq'));

INSERT INTO item_geom_region
	(geom_region_id, region)
	VALUES (DEFAULT, '{
											"type": "Feature",
											"geometry": {
												"type": "Point",
												"coordinates": [125.6, 10.1]
											},
											"properties": {
												"name": "Dinagat Islands"
											}
										}');

/* Add organizations */

INSERT INTO item_organization
	(organization_id, organization_name, community_id)
	VALUES (DEFAULT, 'Renewable Energy Association', currval('item_community_community_id_seq'));

/* Add SOPs */

INSERT INTO sop
	(sop_id, sop_filepath, sop_date_uploaded, organization_id, sop_name)
	VALUES (DEFAULT, '/home/sops/toilet_audit_sop.pdf', '2015-06-07', currval('item_organization_organization_id_seq'), 'Toilet Audit SOP');

/* Add privileges */

INSERT INTO privilege
	(privilege_id, privilege_name)
	VALUES	(4, 'none'),
					(3, 'user'),
					(2, 'auditor'),
					(1, 'org_admin'),
					(0, 'global_admin');

/* Add users */

INSERT INTO users
	(user_id, privilege_id, organization_id, first_name, last_name, email, p_hash, p_salt)
	VALUES
		(DEFAULT, 0, currval('item_organization_organization_id_seq'), 'Olivian', 'Zhang', 'oz@ucla.edu', 'hash1', 'salt1'),
		(DEFAULT, 2, currval('item_organization_organization_id_seq'), 'Harold', 'Auditorsky', 'ht@ucla.edu', 'hash2', 'salt2');

/* Add templates */

INSERT INTO item_template
	(template_id, organization_id, user_id, template_name, room_string, urinal_string, sink_string, toilet_string, mirror_string)
	VALUES
		(DEFAULT,
		currval('item_organization_organization_id_seq'), 
		currval('users_user_id_seq'),
		'{"template_name": "Toilet Audit Template"}',
		'{"room_string": "test"}',
		'{"urinal_string": "test"}',
		'{"sink_string": "test"}',
		'{"toilet_string": "test"}',
		'{"mirror_string": "test"}');	

/* Add audits */

INSERT INTO audit_submission
	(audit_id, organization_id, sop_id, template_id, date_submitted)
	VALUES (DEFAULT,
		currval('item_organization_organization_id_seq'),
		currval('sop_sop_id_seq'),
		currval('item_template_template_id_seq'),
		'03-14-2020');

/* Add toilet brand, condition information */

INSERT INTO toilet_flushometer_brand
	(flushometer_brand_id, flushometer_brand_name)
	VALUES
		(DEFAULT, 'Toilet Flushometer Brand 1'),
		(DEFAULT, 'Toilet Flushometer Brand 2');

INSERT INTO toilet_flushometer_condition
	(flushometer_condition_id, flushometer_condition_name)
	VALUES
		(DEFAULT, 'Good flushometer'),
		(DEFAULT, 'Bad flushometer');

INSERT INTO toilet_basin_brand
	(basin_brand_id, basin_brand_name)
	VALUES
		(DEFAULT, 'Toilet Basin Brand 1'),
		(DEFAULT, 'Toilet Basin Brand 2');

INSERT INTO toilet_basin_condition
	(basin_condition_id, basin_condition_name)
	VALUES
		(DEFAULT, 'Good basin'),
		(DEFAULT, 'Bad basin');

INSERT INTO toilet_stall_condition
	(stall_condition_id, stall_condition_name)
	VALUES
		(DEFAULT, 'Good stall'),
		(DEFAULT, 'Bad stall');

INSERT INTO toilet_sensor_condition
	(sensor_condition_id, sensor_condition_name)
	VALUES
		(DEFAULT, 'Good sensor'),
		(DEFAULT, 'Bad sensor');

/* Add toilet data for one particular audit */

INSERT INTO audit_toilet
	(observation_id, audit_id, gpf, date_conducted, location_id, commentary)
	VALUES
		(DEFAULT, currval('audit_submission_audit_id_seq'), 1.5, '03-11-2020', currval('loc_location_id_seq'),'Commentary on audited toilet 1'),
		(DEFAULT, currval('audit_submission_audit_id_seq'), 2.5, '03-11-2020', currval('loc_location_id_seq'),'Commentary on audited toilet 2'),
		(DEFAULT, currval('audit_submission_audit_id_seq'), 1.4, '03-12-2020', currval('loc_location_id_seq'),'Commentary on audited toilet 3'),
		(DEFAULT, currval('audit_submission_audit_id_seq'), 1.3, '03-12-2020', currval('loc_location_id_seq'),'Commentary on audited toilet 4');
	
INSERT INTO toilet_flushometer_brand_m2m
	(observation_id, flushometer_brand_id)
	VALUES
		(1, 1),
		(2, 2),
		(3, 1),
		(4, 1);

INSERT INTO toilet_flushometer_condition_m2m
	(observation_id, flushometer_condition_id)
	VALUES
		(1, 1),
		(2, 2),
		(3, 2),
		(4, 1);

INSERT INTO toilet_basin_brand_m2m
	(observation_id, basin_brand_id)
	VALUES
		(1, 2),
		(2, 1),
		(3, 2),
		(4, 1);

INSERT INTO toilet_basin_condition_m2m
	(observation_id, basin_condition_id)
	VALUES
		(1, 1),
		(2, 1),
		(3, 1),
		(4, 2);

INSERT INTO toilet_stall_condition_m2m
	(observation_id, stall_condition_id)
	VALUES
		(1, 2),
		(2, 2),
		(3, 2),
		(4, 2);

INSERT INTO toilet_sensor_condition_m2m
	(observation_id, sensor_condition_id)
	VALUES
		(1, 1),
		(2, 2),
		(3, 1),
		(4, 1);