-- Returns id corresponding to name of metadata reference type
CREATE FUNCTION get_mreftype_id (name TEXT)
	RETURNS INT AS
	$$
		DECLARE id INT;
		BEGIN
			SELECT type_id INTO id FROM metadata_reference_type WHERE type_name = get_metadata_reference_type_id.name;
			IF NOT FOUND THEN 
				RAISE EXCEPTION 'metadata_reference_type ID corresponding to name % not found', get_metadata_reference_type_id.name;
			ELSE RETURN id;
			END IF;
		END
	$$ LANGUAGE plpgsql;

-- Returns name corresponding to id of metadata column entry
CREATE FUNCTION get_mcol_name (mcol_id INT)
	RETURNS TEXT AS
	$$
		DECLARE name TEXT;
		BEGIN
			SELECT column_name INTO name FROM metadata_column WHERE column_id=get_mcol_name.mcol_id;
			IF NOT FOUND THEN
				RAISE EXCEPTION 'metadata_column name corresponding to ID % not found', get_mcol_name.mcol_id;
			ELSE RETURN name;
			END IF;
		END
	$$ LANGUAGE plpgsql;

CREATE FUNCTION test (colval ANYELEMENT) RETURNS TEXT AS
$$ BEGIN
RETURN (SELECT FORMAT('blah blah %I=%L=%s blah', colval, colval, colval));
END $$ LANGUAGE plpgsql;

-- Returns id corresponding to item with given 1 ID column value
CREATE FUNCTION get_item_id_c1 (item_table_name TEXT, mcol_id INT, colval ANYELEMENT)
	RETURNS INT AS
	$$
		DECLARE
			mcol_name TEXT := (SELECT get_mcol_name(mcol_id));
			id INT;
		BEGIN
			EXECUTE FORMAT('SELECT item_id FROM %I WHERE %I=%L', item_table_name, mcol_name, colval) INTO id;
			RETURN id;
		END
	$$ LANGUAGE plpgsql;

-- Returns id corresponding to item with given 2 ID column values
CREATE FUNCTION get_item_id_c2 (item_table_name TEXT, mcol_id1 INT, colval1 ANYELEMENT, mcol_id2 INT, colval2 ANYELEMENT)
	RETURNS INT AS
	$$
		DECLARE
			mcol_name1 TEXT := (SELECT get_mcol_name(mcol_id1));
			mcol_name2 TEXT := (SELECT get_mcol_name(mcol_id2));
			id INT;
		BEGIN
			EXECUTE FORMAT('SELECT item_id FROM %I WHERE %I=%L AND %I=%L', item_table_name, mcol_name1, colval1, mcol_name2, colval2) INTO id;
			RETURN id;
		END
	$$ LANGUAGE plpgsql;