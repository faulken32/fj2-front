import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJobSubCat } from '../job-sub-cat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../job-sub-cat.test-samples';

import { JobSubCatService } from './job-sub-cat.service';

const requireRestSample: IJobSubCat = {
  ...sampleWithRequiredData,
};

describe('JobSubCat Service', () => {
  let service: JobSubCatService;
  let httpMock: HttpTestingController;
  let expectedResult: IJobSubCat | IJobSubCat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobSubCatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a JobSubCat', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jobSubCat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(jobSubCat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobSubCat', () => {
      const jobSubCat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(jobSubCat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobSubCat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobSubCat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a JobSubCat', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addJobSubCatToCollectionIfMissing', () => {
      it('should add a JobSubCat to an empty array', () => {
        const jobSubCat: IJobSubCat = sampleWithRequiredData;
        expectedResult = service.addJobSubCatToCollectionIfMissing([], jobSubCat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobSubCat);
      });

      it('should not add a JobSubCat to an array that contains it', () => {
        const jobSubCat: IJobSubCat = sampleWithRequiredData;
        const jobSubCatCollection: IJobSubCat[] = [
          {
            ...jobSubCat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addJobSubCatToCollectionIfMissing(jobSubCatCollection, jobSubCat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobSubCat to an array that doesn't contain it", () => {
        const jobSubCat: IJobSubCat = sampleWithRequiredData;
        const jobSubCatCollection: IJobSubCat[] = [sampleWithPartialData];
        expectedResult = service.addJobSubCatToCollectionIfMissing(jobSubCatCollection, jobSubCat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobSubCat);
      });

      it('should add only unique JobSubCat to an array', () => {
        const jobSubCatArray: IJobSubCat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const jobSubCatCollection: IJobSubCat[] = [sampleWithRequiredData];
        expectedResult = service.addJobSubCatToCollectionIfMissing(jobSubCatCollection, ...jobSubCatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const jobSubCat: IJobSubCat = sampleWithRequiredData;
        const jobSubCat2: IJobSubCat = sampleWithPartialData;
        expectedResult = service.addJobSubCatToCollectionIfMissing([], jobSubCat, jobSubCat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(jobSubCat);
        expect(expectedResult).toContain(jobSubCat2);
      });

      it('should accept null and undefined values', () => {
        const jobSubCat: IJobSubCat = sampleWithRequiredData;
        expectedResult = service.addJobSubCatToCollectionIfMissing([], null, jobSubCat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(jobSubCat);
      });

      it('should return initial array if no JobSubCat is added', () => {
        const jobSubCatCollection: IJobSubCat[] = [sampleWithRequiredData];
        expectedResult = service.addJobSubCatToCollectionIfMissing(jobSubCatCollection, undefined, null);
        expect(expectedResult).toEqual(jobSubCatCollection);
      });
    });

    describe('compareJobSubCat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareJobSubCat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareJobSubCat(entity1, entity2);
        const compareResult2 = service.compareJobSubCat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareJobSubCat(entity1, entity2);
        const compareResult2 = service.compareJobSubCat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareJobSubCat(entity1, entity2);
        const compareResult2 = service.compareJobSubCat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
